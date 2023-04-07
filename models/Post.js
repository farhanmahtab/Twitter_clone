const { Schema, models, model } = require("mongoose");
import Comment from "./Comment";
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
    react: [{ type: Schema.Types.ObjectId, ref: "User" }],
    NumberOfReact: {
      type: "number",
      default: 0,
    },
    comments: [
      {
        createdBy: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        body: {
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
        react: [{ type: Schema.Types.ObjectId, ref: "User" }],
        NumberOfReact: {
          type: "number",
          default: 0,
        },
        replies: [
          {
            createdBy: {
              type: Schema.Types.ObjectId,
              ref: "User",
            },
            body: {
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
          },
        ],
      },
    ],
    retweets: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Posts = models.Posts || model("Posts", postSchema);
export default Posts;
