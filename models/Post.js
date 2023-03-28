const { Schema, models, model } = require("mongoose");
const postSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
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
  NumberOfComment: {
    type: "number",
    default: 0,
  },
});

const Posts = models.Posts || model("Posts", postSchema);
export default Posts;
