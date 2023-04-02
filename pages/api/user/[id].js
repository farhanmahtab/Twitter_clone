import Users from "@/models/User";
import profile from "@/pages/profile/[id]";
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
    res.status(200).json({ message: "user fetched", user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
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

    res.status(200).json({ message: "User updated", user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
export default async function handler(req, res) {
  await connectMongoose();
  if (req.method == "GET") {
    await getUserById(req, res);
  } else if (req.method == "PATCH") {
    await updateUserById(req, res);
  } else {
    req.status(405).json({ message: "Method not allowed" });
  }
}
