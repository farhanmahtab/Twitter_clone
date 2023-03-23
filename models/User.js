import mongoose, { models, Schema } from "mongoose";

const userSchema = new Schema({
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

const User = mongoose.models.User || mongoose.model("user", userSchema);
export default userSchema;
