import connectMongo from "@/Utils/db";
import bcrypt from "bcrypt";
import Users from "../../../models/User";
import { useSession } from "next-auth/react";

//get all user
const getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.query.id;
    const users = await Users.find({});
    const updatedUsers = users.map((user) => {
      const isFollowed = user.followers.includes(currentUserId);
      return { ...user.toObject(), isFollowed };
    });
    //console.log(updatedUsers);
    res.status(200).json({ success: true, users: updatedUsers });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// const getAllUsers = async (req, res) => {
//   try {
//     const users = await Users.find({});
//     res.status(200).json({ success: true, users: users });
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// };

//create a user
const postUsers = async (req, res) => {
  const {
    name,
    username,
    email,
    password,
    profilePicture,
    coverPhoto,
    bio,
    followers,
    following,
  } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  try {
    // Generate a salt for the password hash
    const salt = await bcrypt.genSalt(10);
    // Hash the password using the salt
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new Users({
      name,
      username,
      email,
      password: hashedPassword,
      profilePicture,
      coverPhoto,
      bio,
      followers,
      following,
    });
    await user.save().then(() => console.log("User Created"));
    res.status(200).json({ status: true, data: user });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
};

export default async function handler(req, res) {
  await connectMongo();
  if (req.method === "GET") {
    await getAllUsers(req, res);
  } else if (req.method === "POST") {
    await postUsers(req, res);
  } else {
    res.status(404).json({ success: false, message: "API endpoint not found" });
  }
}
