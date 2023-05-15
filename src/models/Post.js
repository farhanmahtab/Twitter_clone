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
        typeofTweet: {
          type: "string",
          enum: ["original", "retweet"],
        },
        post: {
          type: Schema.Types.ObjectId,
          ref: "Post",
        },
        createdBy: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    typeofTweet: {
      type: "string",
      enum: ["original", "retweet"],
    },
    originalTweetId: {
      type: "string",
    },
    NumberOfRetweet: {
      type: "Number",
      default: 0,
    },
  },
  { timestamps: true }
);

const Posts = models.Posts || model("Posts", postSchema);
export default Posts;
