const { Schema, models, model } = require("mongoose");

const postSchema = new Schema({
  userId: {
    type: "string",
    required: true,
  },
  name: {
    type: "string",
    required: true,
  },
  userName: {
    type: "string",
  },
  body: {
    type: "string",
  },
  PostImage: {
    type: "string",
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  NumberOfReact: {
    type: "number",
    default: 0,
  },
  // reacts: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  // ],
  // comments: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  // ],
  NumberOfComment: {
    type: "number",
    default: 0,
  }
});

const Posts = models.Posts || model("Posts", postSchema);
export default Posts;
