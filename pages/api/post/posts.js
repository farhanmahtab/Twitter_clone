import connectMongo from "@/Utils/db";
import Posts from "../../../models/Post";
import User from "../../../models/User";
import formidable from "formidable";
import path from "path";
import bodyParser from "body-parser";

const jsonParser = bodyParser.json();

export const config = {
  api: {
    bodyParser: false,
  },
};
export const parseForm = async (req) => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm({
      uploadDir: path.join(process.cwd(), "public", "images"),
      keepExtensions: true,
    });
    form.parse(req, function (err, fields, files) {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};

//Get all post
const getAllPosts = async (req, res) => {
  try {
    const posts = await Posts.find({})
      .populate("createdBy", "name username email profilePicture")
      .populate({
        path: "comments",
        populate: { path: "replies", select: "createdBy body" },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "Posts fetched", posts });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
// create a new post with single image
const createPost = async (req, res) => {
  try {
    const { fields, files } = await parseForm(req);
    //console.log(files)
    const email = fields.email;
    const author = await User.findOne({ email: email });
    let image = null;
    if (files.PostImage) {
      image = files.PostImage.newFilename;
    }
    console.log(image);
    //console.log(author._id);
    const body = fields.body;
    const post = await Posts.create({
      createdBy: author._id,
      body: body,
      typeofTweet: "original",
      PostImage: image,
    });
    await post.save().then(() => console.log("post Created"));
    await post.populate("createdBy", "name username profilePicture");
    res.status(200).json({ status: true, data: post });
    //console.log(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: " Server Error" });
  }
};

//delete a post By Id
const deleteTweet = async (req, res) => {
  jsonParser(req, res, async () => {
    const { postId } = req.body;
    console.log(postId);
    try {
      const post = await Posts.findById(postId);
      console.log(post);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      await Posts.findByIdAndDelete(postId);
      return res.status(200).json({ message: "Post deleted" });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });
};

//Udpate Post
const updatePostById = async (req, res) => {
  jsonParser(req, res, async () => {
    try {
      const id = req.query.postId;
      console.log(id);
      const { body, postImage } = req.body;
      const updatedPost = {};
      updatedPost.id = id;
      //console.log(id);
      if (body) updatedPost.body = body;
      if (postImage) updatedPost.postImage = postImage;

      const post = await Posts.findByIdAndUpdate(id, updatedPost, {
        new: true,
        runValidators: true,
      }).populate({
        path: "createdBy",
        select: "name username email profilePicture",
      });
      //console.log(post);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json({ message: "Post updated", post });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });
};

export default async function handler(req, res) {
  await connectMongo();
  if (req.method === "GET") {
    await getAllPosts(req, res);
  } else if (req.method === "POST") {
    await createPost(req, res);
  } else if (req.method === "DELETE") {
    await deleteTweet(req, res);
  } else if (req.method === "PATCH") {
    await updatePostById(req, res);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
