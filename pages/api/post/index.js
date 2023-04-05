import connectMongo from "@/Utils/db";
import Posts from "../../../models/Post";
import User from "../../../models/User";

//Get all post
const getAllposts = async (req, res) => {
  try {
    const posts = await Posts.find({})
      .populate("createdBy", "name username email profilePicture")
      .populate("Comment", "body")
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
      PostImage: req.body.PostImage,
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

//post with single image
// import connect from "@/db/connect";
// import Post from "@/models/Post";
// import User from "@/models/User";
// import formidable from "formidable";
// import fs from "fs";
// import path from "path";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export const parseForm = async (req) => {
//   return new Promise((resolve, reject) => {
//     const form = new formidable.IncomingForm({
//       uploadDir: path.join(process.cwd(), "public", "images"),
//       keepExtensions: true,
//     });
//     form.parse(req, function (err, fields, files) {
//       if (err) return reject(err);
//       resolve({ fields, files });
//     });
//   });
// };

// const handler = async (req, res) => {
//   if (req.method === "POST") {
//     try {
//       await connect();
//       const { fields, files } = await parseForm(req);

//       const email = fields.email;
//       let image = null;
//       if (files.postImages) {
//         image = files.postImages.newFilename;
//       }

//       console.log(image);
//       const postAuthor = await User.findOne({ email: email });

//       const postContent = fields.postContent;

//       const newPost = await Post.create({
//         postAuthor: postAuthor._id,
//         postContent: postContent,
//         postImages: image,
//       });

//       const createdPost = await newPost.save();
//       res.status(201).json({ message: "Post created", createdPost });
//     } catch (err) {
//       console.log(err.message);
//       return res
//         .status(500)
//         .json({ message: "Something went wrong", error: err });
//     }
//   }
// };

// export default handler;
