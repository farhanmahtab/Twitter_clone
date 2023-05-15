import connectMongo from "@/Utils/db";
import bcrypt from "bcrypt";
import User from "@/models/User";

export default async function handler(req, res) {
  if (req.method == "GET") {
    let { number } = req.query;
    if (!number) number = 5;

    try {
      await connectMongo();
      const users = await User.find().limit(number).select({
        _id: 1,
        name: 1,
        username: 1,
        email: 1,
        profilePicture: 1,
      });
      return res.status(200).json({ msg: "Success", users });
    } catch (error) {
      return res.status(500).json({ msg: "Server error" });
    }
  }
  return res.status(404).json({ msg: "Method not found" });
}
