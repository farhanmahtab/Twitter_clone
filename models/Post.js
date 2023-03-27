const { Schema, models, model } = require("mongoose");

const postSchema = new Schema({
  userId: {
    type: "string",
  },
  userName: {
    type: "string",
    required: true,
  },
  text: {
    type: "string",
  },
  img: {
    type: "string",
  },
});

const Posts = models.Posts || model("posts",postSchema);
export default Posts;
