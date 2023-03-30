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
  console.log(id);
  try {
    const post = await Posts.findById(id)
      .populate({
        path: "createdBy",
        select: "name username email profilePicture",
      })
      .populate({
        path:"Comment",
        select: "body createdAt",
        populate:{
          path:"author",
          select:"name username email profilePicture"
        }
      })
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    console.log(post.Comment)
    res.status(200).json({ message: "Post fetched", post });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
//delete a post
// const deleteTweet = async (req, res, user) => {
//   const { id } = req.query;
//   console.log(user);
//   try {
//     const post = await Posts.findById(id);
//     if (session.user.id === post.createdBy) {
//       await post.deleteOne();
//       res.status(200).json({
//         success: true,
//         message: "Post deleted",
//       });
//     } else {
//       res.status(401).json({
//         success: false,
//         message: "You are not authorized to delete this post",
//       });
//     }
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// };

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
