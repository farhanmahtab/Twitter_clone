import conncetMongoose from "@/Utils/db";
import Posts from "../../../models/Post";

await conncetMongoose();
export default async (req, res) => {
  const { method, body } = req;

  switch (method) {
    case "POST":
      try {
        const { postId, reaction } = body;

        // Find the post by ID
        const post = await Posts.findById(postId);

        // If the post doesn't exist, return a 404 error
        if (!post) {
          return res.status(404).json({ message: "Post not found" });
        }

        // Get the current user ID (you can replace this with your own authentication logic)
        const userId = "1234567890";

        // Update the reactions map with the user's reaction
        post.reactions.set(userId, reaction);

        // Save the updated post
        await post.save();

        // Return the updated post
        return res.status(200).json({ post });
      } catch (err) {
        return res.status(500).json({ message: "Server error" });
      }
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
};
