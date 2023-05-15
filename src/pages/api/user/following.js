import connectMongo from "@/Utils/db";
import Users from "@/models/User";

const getFollowoing = async (req, res) => {
  const userId = req.query.id;

  try {
    const user = await Users.findById(userId).populate(
      "following",
      "name username  profilePicture followers following"
    );
    res.status(200).json({
      type: "Following",
      status: 200,
      message: "OK",
      following: user.following,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      type: "Following",
      status: 400,
      message: "Error",
      error: error.message,
    });
  }
};

export default async function handler(req, res) {
  await connectMongo();
  if (req.method === "GET") {
    await getFollowoing(req, res);
  } else {
    res.status(404).json({ success: false, message: "API endpoint not found" });
  }
}
