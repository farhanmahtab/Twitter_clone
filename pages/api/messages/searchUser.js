import User from "@/models/User";

const handler = async (req, res) => {
  try {
    const { search } = req.query;
    const users = await User.find({
      $or: [
        { username: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    }).select({ username: 1, email: 1, name: 1, profilePicture: 1 });

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default handler;
