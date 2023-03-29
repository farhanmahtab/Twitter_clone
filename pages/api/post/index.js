import connectMongo from "@/Utils/db";
import { getServerSession } from "next-auth";
import Posts from "../../../models/Post";
import User from "../../../models/User";
import Comment from "@/components/Comment";
import { authOptions } from "../auth/[...nextauth]";

//Get all post
const getAllposts = async (req, res) => {
  try {
    const posts = await Posts.find({})
      .populate("createdBy", "name username email profilePicture")
      .sort({ createdAt: -1 });
    res.status(200).json({ message: "Posts fetched", posts });
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
    await getAllposts(req, res);
  } else if (req.method === "POST") {
    await postTweet(req, res);
  } else if (req.method === "DELETE") {
    await deleteTweet(req, res, session);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
