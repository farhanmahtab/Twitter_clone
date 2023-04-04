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
        return res
          .status(404)
          .json({ success: false, message: "Post not found" });
      }
      const liked = post.react.includes(userId);
      if (liked) {
        post.react = post.react.filter(
          (id) => id.toString() !== userId.toString()
        );
        await post.save();
        return res.status(200).json({ success: true, message: "unliked" });
      } else {
        post.react.push(userId);
        await post.save();
        return res.status(200).json({ success: true, message: "liked" });
      }
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
}
