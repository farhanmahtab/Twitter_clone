const { Schema, models, model } = require("mongoose");

const postSchema = new Schema({
  userId: {
    type: "string",
  },
  name: {
    type: "string",
    required: true,
  },
  userName: {
    type: "string",
  },
  text: {
    type: "string",
  },
  img: {
    type: "string",
  },
  createdAt: Date,
  updatedAt: Date,
  reacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Posts = models.Posts || model("Posts", postSchema);
export default Posts;
