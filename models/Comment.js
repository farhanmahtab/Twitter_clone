const { Schema, models, model } = require("mongoose");

const commentScheama = new Schema({
  body: {
    type: String,
    require: true,
  },
  reply: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Posts",
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
});
const Comment = models.Comment || model("Comment", commentScheama);
export default Comment;
