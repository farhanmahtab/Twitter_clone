import connectMongo from "@/Utils/db";
import Posts from "../../../models/Post";
import User from "../../../models/User";

//Get all post
const getAllposts = async (req, res) => {
  try {
    const posts = await Posts.find({});
    res.status(200).json({ success: true, posts: posts });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// create a new post
const postTweet = async (req, res) => {
  const { body, PostImage } = req.body;
  if (!body && !PostImage) {
    return res.status(400).json({ message: "Add something to post" });
  }
  try {
    const author = await User.findOne({ email: req.body.email });
    //console.log(author._id);

    const post = await Posts.create({
      createdBy: author._id,
      body: req.body.body,
    });
    await post.save().then(() => console.log("post Created"));
    res.status(200).json({ status: true, data: post });
    //console.log(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: " Server Error" });
  }
};

export default async function handler(req, res) {
  await connectMongo();
  if (req.method === "GET") {
    await getAllposts(req, res);
  } else if (req.method === "POST") {
    await postTweet(req, res);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
