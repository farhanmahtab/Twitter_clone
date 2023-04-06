import connectMongo from "@/Utils/db";
import Posts from "../../../models/Post";
import Comment from "../../../models/Comment";

//get post by id
const getPostById = async (req, res) => {
  const {
    query: { id },
    method,
  } = req;
  //console.log(id);
  try {
    const post = await Posts.findById(id)
      .populate({
        path: "createdBy",
        select: "name username email profilePicture",
      })
      .populate({
        path: "Comment",
        select: "body createdAt",
        populate: {
          path: "author",
          select: "name username email profilePicture",
        },
      });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    //console.log(post.Comment)
    res.status(200).json({ message: "Post fetched", post });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
//Update post
const updatePostById = async (req, res) => {
  try {
    const {
      query: { id },
      body: { body, PostImage },
      method,
    } = req;

    const updatedPost = {};
    if (body) updatedPost.body = body;
    if (PostImage) updatedPost.PostImage = PostImage;

    const post = await Posts.findByIdAndUpdate(id, updatedPost, {
      new: true,
      runValidators: true,
    })
      .populate({
        path: "createdBy",
        select: "name username email profilePicture",
      })
      .populate({
        path: "Comment",
        select: "body createdAt",
        populate: {
          path: "author",
          select: "name username email profilePicture",
        },
      });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post updated", post });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// delete a post
const deleteTweet = async (req, res) => {
  const { id } = req.query;
  try {
    const post = await Posts.findById(id);
    const postId = req.query.id;
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await Posts.findByIdAndDelete(postId);

    const comments = await Comment.find({ post: id });

    const deleteCommentsAndReplies = async (commentIds) => {
      for (const commentId of commentIds) {
        const comment = await Comment.findById(commentId);
        if (comment) {
          if (comment.reply.length > 0) {
            await deleteCommentsAndReplies(comment.reply);
          }
          await Comment.findByIdAndDelete(commentId);
        }
      }
    };

    await deleteCommentsAndReplies(comments.map((comment) => comment._id));

    // Delete comments associated with the post
    //await Comment.deleteMany({ post: id });

    return res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export default async function handler(req, res) {
  await connectMongo();
  if (req.method === "GET") {
    await getPostById(req, res);
  } else if (req.method === "DELETE") {
    await deleteTweet(req, res);
  } else if (req.method == "PATCH") {
    await updatePostById(req, res);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
