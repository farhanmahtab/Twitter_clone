import connectMongo from "@/Utils/db";
import User from "../../../models/User";

export default async function handler(req, res) {
  const { name, username, email, password } = req.body;
  await connectMongo();
  res.json({ name: name, username: username, email: email });
  if (req.method === "POST") {
    try {
      // Create a new User document
      const user = new User({
        name,
        username,
        email,
        password,
      });
      await user.save();
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(404).json({ success: false, message: "API endpoint not found" });
  }
}
