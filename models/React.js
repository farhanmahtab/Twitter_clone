const { Schema, models, model } = require("mongoose");

const reactSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
});

const React = models.React || model("React", reactSchema);
export default React;
