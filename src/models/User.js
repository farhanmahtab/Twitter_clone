import mongoose, { Schema, models } from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: "Please enter a valid email address",
      },
    },
    password: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    coverPhoto: {
      type: String,
    },
    bio: {
      type: String,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    token: {
      type: String,
    },
    notifications: [
      {
        chatID: {
          type: Schema.Types.ObjectId,
          ref: "MessageDBV2",
        },
        messageID: {
          type: Schema.Types.ObjectId,
          ref: "MessageDBV2.messages",
        },
        sender: {
          type: Schema.Types.ObjectId,
          ref: "UserDBV2",
          required: true,
        },
        cus_id: {
          type: String,
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
        body: {
          type: String,
          required: true,
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

    messages: [
      {
        sender: {
          type: Schema.Types.ObjectId,
          ref: "UserDBV2",
          required: true,
          unique: true,
        },
        chatID: {
          type: Schema.Types.ObjectId,
          ref: "MessageDBV2",
        },
        messageID: {
          type: Schema.Types.ObjectId,
          ref: "MessageDBV2.messages",
        },
        cus_id: {
          type: String,
        },
        username: {
          type: String,
        },
        email: {
          type: String,
        },
        image: {
          type: String,
        },
        body: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);
const Users = models.User || mongoose.model("User", userSchema);
export default Users;
