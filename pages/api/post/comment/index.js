import Comment from "@/models/Comment";
import Posts from "@/models/Post";
import Users from "@/models/User";
import conncetMongoose from "@/Utils/db";

//Get all comments
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate("author", "name username email profilePicture")
      .populate("post", "body postImage createdAt")
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "Comments Fetched", data: comments });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
//create a new comment
const postComments = async (req, res) => {
  try {
    const author = await Users.findOne({ email: req.body.email });
    const post = await Posts.findOne({ post: req.body.id });
    const { body } = req.body;
    console.log(author._id);
    console.log(post._id);
    const comment = await Comment.create({
      author: author._id,
      post: post._id,
      body: body,
    });
    await comment.save().then(() => console.log("comment saved"));
    res.status(200).json({ message: "Comment created",status: true, data: comment });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
export default async function handler(req, res) {
  await conncetMongoose();
  if (req.method === "GET") {
    await getComments(req, res);
  } else if (req.method === "POST") {
    await postComments(req, res);
  } else {
    res.status(404).json({ message: "Method Not Allowed" });
  }
}
