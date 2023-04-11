import Posts from "@/models/Post";
import Users from "@/models/User";
import conncetMongoose from "@/Utils/db";
import bodyParser from "body-parser";

const jsonParser = bodyParser.json();

//Get comments by post Id
const getComments = async (req, res) => {
  try {
    const { postId } = req.query;
    const post = await Posts.findById(postId)
      .populate({
        path: "comments.createdBy",
        select: "name username email profilePicture",
      })
      .populate({
        path: "comments.replies",
        select: "createdBy body createdAt updatedAt",
        populate:{
          path:"createdBy",
          select: "name username email profilePicture",
        }
      });
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    const comments = post.comments.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

//create Comment
const postComments = async (req, res) => {
  jsonParser(req, res, async () => {
    try {
      const { email, postId, body } = req.body;
      const user = await Users.findOne({ email });

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      const post = await Posts.findById(postId);

      if (!post) {
        return res
          .status(404)
          .json({ success: false, message: "Post not found" });
      }
      const comment = {
        createdBy: user._id,
        body,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      post.comments.push(comment);
      await post.save();

      res.status(201).json({ success: true, comment });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });
};

//delete Comment by id
const deleteComment = async (req, res) => {
  jsonParser(req, res, async () => {
    try {
      const commentId = req.body.commentId;
      const post = await Posts.findOneAndUpdate(
        { "comments._id": commentId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
      if (!post) {
        return res
          .status(404)
          .json({ success: false, message: "Comment not found" });
      }
      const deletedComment = post.comments.find(
        (comment) => comment._id.toString() === commentId
      );
      if (!deletedComment) {
        return res
          .status(404)
          .json({ success: false, message: "Comment not found" });
      }

      res
        .status(200)
        .json({ success: true, message: "Comment deleted successfully" });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });
};

export default async function handler(req, res) {
  await conncetMongoose();
  if (req.method === "GET") {
    await getComments(req, res);
  } else if (req.method === "POST") {
    await postComments(req, res);
  } else if (req.method === "DELETE") {
    await deleteComment(req, res);
  } else {
    res.status(404).json({ message: "Method Not Allowed" });
  }
}
