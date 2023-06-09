import connectMongo from "@/Utils/db";
import Users from "../../../models/User";

const getFollower = async (req, res) => {
  const userId = req.query.id;

  try {
    const user = await Users.findById(userId).populate(
      "followers",
      "name username  profilePicture followers"
    );
    res.status(200).json({ followers: user.followers });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export default async function handler(req, res) {
  await connectMongo();
  if (req.method === "GET") {
    await getFollower(req, res);
  } else {
    res.status(404).json({ success: false, message: "API endpoint not found" });
  }
}
