import connectMongo from "@/Utils/db";
import Users from "../../../models/User";

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    res.status(200).json({ success: true, users: users });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const postUsers = async (req, res) => {
  try {
    const user = new Users({
      userId: Date.now(),
      name,
      username,
      email,
      password,
      profilePicture
    });
    await user.save();
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export default async function handler(req, res) {
  const { userId, name, username, email, password } = req.body;
  await connectMongo();

  //res.json({ name: name, username: username, email: email });
  if (req.method === "GET") {
    await getAllUsers(req, res);
  } else if (req.method === "POST") {
    await postUsers(req, res);
  } else {
    res.status(404).json({ success: false, message: "API endpoint not found" });
  }
}
