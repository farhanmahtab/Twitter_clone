import { Schema, model, models } from "mongoose";
import User from "./User";

const messageSchema = new Schema(
  {
    cus_id: {
      type: String,
    },
    notification: {
      type: Boolean,
      default: false,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messages: [
      {
        sender: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        receiver: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        senderUsername: {
          type: String,
        },
        senderEmail: {
          type: String,
        },
        senderImage: {
          type: String,
        },
        receiverUsername: {
          type: String,
        },
        receiverEmail: {
          type: String,
        },
        receiverImage: {
          type: String,
        },
        body: {
          type: String,
          required: true,
        },
        image: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        seen: {
          type: Boolean,
          default: false,
        },
        seenAt: {
          type: Date,
        },
      },
    ],
  },
  { timestamps: true }
);

const Messages = models.Message || model("Message", messageSchema);
export default Messages;
