import Posts from "@/models/Post";
import Users from "@/models/User";
import conncetMongoose from "@/Utils/db";

//get replies
const getReply = async (req, res) => {
  try {
    const { commentId } = req.query;
    const comment = await Posts.findOne({ "comments._id": commentId })
      .select("comments.$")
      .populate({
        path: "comments.replies.createdBy",
        select: "name username email profilePicture",
      })
      .exec();

    if (!comment) {
      return res
        .status(404)
        .json({ type: "Reply", status: 404, message: "COmment not found" });
    }

    const commentReplies = comment.comments[0].commentReplies;

    return res.status(200).json({
      type: "Reply",
      status: 200,
      message: "OK",
      comment,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({
      type: "Reply",
      status: 400,
      message: "Bad request",
      error: err.message,
    });
  }
};

//create a reply
const postReply = async (req, res) => {
  const { email, postId, commentId, body } = req.body;
  console.log(postId, " -- ", commentId);
  const user = await Users.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      status: 404,
      message: "User not found",
    });
  }
  try {
    const post = await Posts.findById(postId);
    console.log(post);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, status: 404, message: "Post not found" });
    }
    const comment = post.comments.find(
      (comment) => comment._id.toString() === commentId
    );

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, status: 404, message: "Comment not found" });
    }

    const reply = {
      createdBy: user._id,
      body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    //console.log(reply);
    comment.replies.push(reply);
    await post.save();
    return res.status(201).json({
      success: true,
      type: "Reply",
      status: 201,
      message: "Reply Created",
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      type: "Reply",
      status: 400,
      message: "Bad Request",
      error: error.message,
    });
  }
};

export default async function handler(req, res) {
  await conncetMongoose();
  if (req.method == "GET") {
    await getReply(req, res);
  } else if (req.method === "POST") {
    await postReply(req, res);
  } else {
    res.status(404).json({ message: "Method Not Allowed" });
  }
}
