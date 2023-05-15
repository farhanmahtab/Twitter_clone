import Users from "@/models/User";
import connectMongoose from "@/Utils/db";

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
    res.status(200).json({ type: "User", status: 200, message: "OK", user });
  } catch (error) {
    res.status(400).json({
      type: "Error",
      status: 404,
      message: "Not found",
      error: error.message,
    });
  }
};

//update user
const updateUserById = async (req, res) => {
  try {
    const {
      query: { id },
      body: {
        name,
        username,
        profilePicture,
        coverPhoto,
        bio,
        email,
        password,
      },
      method,
    } = req;

    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (username) updatedFields.username = username;
    if (email) updatedFields.email = email;
    if (password) updatedFields.password = password;
    if (profilePicture) updatedFields.profilePicture = profilePicture;
    if (coverPhoto) updatedFields.coverPhoto = coverPhoto;
    if (bio) updatedFields.bio = bio;

    const user = await Users.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    })
      .populate({
        path: "followers",
        select: "name username email profilePicture",
      })
      .populate({
        path: "following",
        select: "name username email profilePicture",
      });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ type: "User", status: 200, message: "Updated", user });
  } catch (error) {
    res.status(400).json({
      type: "User",
      status: 404,
      message: "User Not Found",
      error: error.message,
    });
  }
};

//follow unFollow user
const followUnfollowUser = async (req, res) => {
  const id = req.query.id;
  const currentUserId = req.body.currentUserId;
  try {
    const user = await Users.findById(currentUserId);
    const userToFollow = await Users.findById(id);
    if (user.following.includes(id)) {
      await user.following.pull(id);
      await userToFollow.followers.pull(currentUserId);
      res.status(201).json({
        type: "FOllow",
        status: 201,
        message: "user Un-followed",
        userToFollow,
      });
    } else {
      await user.following.push(id);
      await userToFollow.followers.push(currentUserId);
      res.status(201).json({
        type: "FOllow",
        status: 201,
        message: "user followed",
        userToFollow,
      });
    }
    await user.save();
    await userToFollow.save();
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      type: "User",
      status: 404,
      message: "Error",
      error: err.message,
    });
  }
};

export default async function handler(req, res) {
  await connectMongoose();
  if (req.method == "GET") {
    await getUserById(req, res);
  } else if (req.method == "PATCH") {
    await updateUserById(req, res);
  } else if (req.method == "POST") {
    await followUnfollowUser(req, res);
  } else {
    req.status(405).json({ message: "Method not allowed" });
  }
}
