import connectMongo from "@/Utils/db";
import Users from "../../../models/User";
import Posts from "../../../models/Post";

const getPostByUserId = async (req, res) => {
  const userId = req.query.id;
  //console.log(userId);
  try {
    const user = await Users.findById(userId);
    //console.log(user);
    const posts = await Posts.find({ createdBy: user })
      .populate({
        path: "createdBy",
        select: "name username profilePicture",
      })
      .sort({
        postCreatedAt: -1,
      });
    res.status(200).json({ message: "Posts fetched", user,posts });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export default async function handler(req, res) {
  await connectMongo();
  if (req.method === "GET") {
    await getPostByUserId(req, res);
  } else {
    res.status(404).json({ success: false, message: "API endpoint not found" });
  }
}
