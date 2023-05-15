import connectMongo from "@/Utils/db";
import Posts from "@/models/Post";
import User from "@/models/User";
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

//new getPost
const getAllPosts = async (req, res) => {
  try {
    const { page = 0 } = req.query.page;
    const posts = await Posts.find({})
      .populate("createdBy", "name username email profilePicture")
      .populate({
        path: "Comments",
        populate: { path: "replies", select: "createdBy body" },
        strictPopulate: false,
      })
      .sort({ createdAt: -1 })
      .skip(req.query.page)
      .limit(5);
    res.status(200).json({
      type: "Posts",
      status: 200,
      message: "OK",
      posts,
      nextpage: parseInt(page) + posts.length,
    });
  } catch (error) {
    res.status(400).json({
      type: "Error",
      status: 400,
      message: "Bad request",
      error: error.message,
    });
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
    res
      .status(200)
      .json({ type: "Posts", status: 201, message: "Created", data: post });
    //console.log(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      type: "Error",
      status: 400,
      message: "Bad request",
      error: error.message,
    });
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
        return res.status(404).json({
          type: "Error",
          status: 404,
          message: "Not Found",
          error: error.message,
        });
      }
      await Posts.findByIdAndDelete(postId);
      return res
        .status(200)
        .json({ type: "Posts", status: 200, message: "Deleted" });
    } catch (error) {
      res.status(400).json({
        type: "Error",
        status: 400,
        message: "Bad request",
        error: error.message,
      });
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
        select: "name username email profilePicture createdAt",
      });
      //console.log(post);
      if (!post) {
        return res
          .status(404)
          .json({
            type: "Error",
            status: 404,
            message: "Not Found",
            error: error.message,
          });
      }
      res
        .status(200)
        .json({ type: "Posts", status: 200, message: "Updated", post });
    } catch (error) {
      res.status(400).json({
        type: "Error",
        status: 400,
        message: "Bad request",
        error: error.message,
      });
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