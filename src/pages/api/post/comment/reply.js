import Comment from "@/models/Comment";
import Posts from "@/models/Post";
import Users from "@/models/User";
import conncetMongoose from "@/Utils/db";

//get all replies by commentId
const getReplyByCommentId = async (req, res) => {
  // const commentId  = req.body.commentId;
  const { commentId } = req.query;
  try {
    const comment = await Comment.findById(commentId).populate({
      path: "reply",
      populate: {
        path: "author",
        select: "name username profilePicture",
      },
    });
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    const replies = comment.reply;
    res.status(200).json({ message: "Replies Fetched", data: replies });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

//post a reply
const postReply = async (req, res) => {
  try {
    const { commentId, body } = req.body;
    const author = await Users.findOne({ email: req.body.email });
    // Find the parent comment to reply to
    const parentComment = await Comment.findById(commentId);

    if (!parentComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    const replyComment = new Comment({
      body,
      author: author._id,
      commentId: commentId,
      reply: [],
    });

    await replyComment.save();
    parentComment.reply.push(replyComment._id);
    await parentComment.save();

    // return res.status(201).json(replyComment);
    return res
      .status(200)
      .json({ message: "Reply created", status: true, data: replyComment });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

export default async function handler(req, res) {
  await conncetMongoose();
  if (req.method == "GET") {
    await getReplyByCommentId(req, res);
  } else if (req.method === "POST") {
    await postReply(req, res);
  } else {
    res.status(404).json({ message: "Method Not Allowed" });
  }
}
