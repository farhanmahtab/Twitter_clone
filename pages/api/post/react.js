import conncetMongoose from "@/Utils/db";
import Posts from "../../../models/Post";

export default async function handler(req, res) {
  await conncetMongoose();
  if (req.method === "POST") {
    try {
      const postId = req.query.postId;
      const userId = req.body.userId;
      const post = await Posts.findById(postId);
      if (!post) {
        return res.status(404).json({
          success: false,
          type: "Reacts",
          status: 404,
          message: "Post not Found",
        });
      }
      const liked = post.react.includes(userId);
      if (liked) {
        post.react = post.react.filter(
          (id) => id.toString() !== userId.toString()
        );
        await post.save();
        return res.status(200).json({
          success: true,
          type: "Reacts",
          status: 201,
          message: "Unliked",
        });
      } else {
        post.react.push(userId);
        await post.save();
        return res.status(200).json({
          success: true,
          type: "Reacts",
          status: 201,
          message: "Liked",
        });
      }
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
}
