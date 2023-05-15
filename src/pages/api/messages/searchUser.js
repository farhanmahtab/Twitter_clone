import User from "@/@/models/User";

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

    res.status(200).json({
      success: true,
      type: "Search",
      status: 200,
      message: "OK",
      users,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      status: 400,
      message: "Bad request",
      error: err.message,
    });
  }
};

export default handler;
