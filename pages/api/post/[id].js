import connectMongo from "@/Utils/db";
import { getServerSession } from "next-auth";
import Posts from "../../../models/Post";
import { authOptions } from "../auth/[...nextauth]";

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
    return res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export default async function handler(req, res) {
  const session = getServerSession(req, res, authOptions);
  await connectMongo();
  if (req.method === "GET") {
    await getPostById(req, res);
  } else if (req.method === "DELETE") {
    await deleteTweet(req, res, session);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
