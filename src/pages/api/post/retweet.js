import connectMongo from "@/Utils/db";
import Posts from "@/models/Post";
import User from "@/models/User";
import bodyParser from "body-parser";

const jsonParser = bodyParser.json();

const postRetweet = async (req, res) => {
  try {
    const { postId, email, postBody } = req.body;
    const user = await User.findOne({ email });

    const post = await Posts.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, status: 404, message: "Post not found" });
    }
    if (!user) {
      return res
        .status(404)
        .json({ success: false, status: 404, message: "User not found" });
    }

    const retweetPost = new Posts({
      createdBy: user._id,
      body: postBody,
      // createdAt: Date.now(),
      typeofTweet: "retweet",
      originalTweetId: postId,
    });
    await retweetPost.save();

    post.retweets.push({
      typeofTweet: "retweet",
      post: retweetPost._id,
      createdBy: user._id,
    });
    post.NumberOfRetweet += 1;

    await post.save();
    return res.status(201).json({
      success: true,
      type: "Retweet",
      status: 201,
      message: "Retweet created successfully",
      data: post,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      status: 400,
      message: "Bad request",
      error: error.message,
    });
  }
};

export default async function handler(req, res) {
  await connectMongo();
  if (req.method === "POST") {
    await postRetweet(req, res);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
