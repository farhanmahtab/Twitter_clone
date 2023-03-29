const { Schema, models, model } = require("mongoose");
const postSchema = new Schema(
  {
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
    react: [
      {
        type: Schema.Types.ObjectId,
        ref: "React",
      },
    ],
    NumberOfReact: {
      type: "number",
      default: 0,
    },
    comment: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    NumberOfComment: {
      type: "number",
      default: 0,
    },
  },
  { timestamps: true }
);

const Posts = models.Posts || model("Posts", postSchema);
export default Posts;
