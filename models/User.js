import mongoose, { models, Schema } from "mongoose";

const usersSchema = new Schema({
  userID: {
    type: String,
  },
  name: {
    type: "string",
    required: true,
  },
  username: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
});

const Users = models.Users || mongoose.model("users", usersSchema);
export default Users;
