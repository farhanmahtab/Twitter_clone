import Users from "@/models/User";
import conncetMongoose from "@/Utils/db";

//get user by id
const getUserById = async (req, res) => {
  const {
    query: { id },
    method,
  } = req;
  //console.log(id);
  try {
    const user = await Users.findById(id)
      .populate({
        path: "followers",
        select: "name username email profilePicture",
      })
      .populate({
        path: "following",
        select: "name username email profilePicture",
      });
    if (!user) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "user fetched", user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
export default async function handler(req, res) {
  await conncetMongoose();
  if (req.method == "GET") {
    await getUserById(req, res);
  } else {
    req.status(405).json({ message: "Method not allowed" });
  }
}
