import connectMongo from "@/Utils/db";
import User from "@/models/User";
import Message from "@/models/Message";
import service from "./service.json";
import * as admin from "firebase-admin";

//Get Messages
const getAllMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;
    const messages = await Message.findOne({
      cus_id:
        senderId >= receiverId ? senderId + receiverId : receiverId + senderId,
    }).sort({ "messages.createdAt": -1 });
    const messages2 = await Message.findOne({
      sender: receiverId,
      receiver: senderId,
    }).sort({ "messages.createdAt": -1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//post Message
const postMessages = async (req, res) => {
  try {
    const { senderEmail, receiverEmail, body } = req.body;

    const [sender, receiver] = await Promise.all([
      User.findOne({ email: senderEmail }).select({
        username: 1,
        _id: 1,
        image: 1,
        email: 1,
      }),
      User.findOne({ email: receiverEmail }).select({
        username: 1,
        _id: 1,
        image: 1,
        email: 1,
        token: 1,
      }),
    ]);

    let existingMessage = await Message.findOne({
      cus_id:
        sender._id >= receiver._id
          ? sender._id + receiver._id
          : receiver._id + sender._id,
    });

    const mainData = {
      sender: sender._id,
      receiver: receiver._id,
      senderUsername: sender.username,
      senderEmail,
      senderImage: sender.image,
      receiverUsername: receiver.username,
      receiverEmail,
      receiverImage: receiver.image,
      body: body,
      //image,
    };

    if (existingMessage) {
      (existingMessage.cus_id =
        sender._id >= receiver._id
          ? sender._id + receiver._id
          : receiver._id + sender._id),
        existingMessage.messages.push(mainData);
      await existingMessage.save();
    } else {
      existingMessage = await Message.create({
        cus_id:
          sender._id >= receiver._id
            ? sender._id + receiver._id
            : receiver._id + sender._id,
        sender: sender._id,
        receiver: receiver._id,
        messages: [mainData],
      });
    }

    if (receiver.token) {
      if (admin.apps.length == 0) {
        admin.initializeApp({
          credential: admin.credential.cert(service),
        });
      }
      const messaging = admin.messaging();
      const msg = await messaging.send({
        token: receiver.token,
        notification: {
          title: `${sender.username} sent you a message`,
          body: `${body}`,
        },
        data: {
          key: "value",
          name: "sourav",
          message: JSON.stringify(mainData),
        },
        webpush: {
          headers: {
            Urgency: "high",
          },
          fcm_options: {
            link: `http://localhost:3000/message?senderId=${receiver._id}&receiverId=${sender._id}`,
          },
        },
      });
    }
    const [result1, result2, noti1] = await Promise.all([
      User.updateOne(
        {
          _id: sender._id,
          "messages.sender": { $ne: receiver._id },
        },
        {
          $addToSet: {
            messages: {
              sender: receiver._id,
              chatID: existingMessage._id,
              cus_id: existingMessage.cus_id,
              username: receiver.username,
              email: receiver.email,
              image: receiver.image,
            },
          },
        }
      ),
      User.updateOne(
        {
          _id: receiver._id,
          "messages.sender": { $ne: sender._id },
        },
        {
          $addToSet: {
            messages: {
              sender: sender._id,
              chatID: existingMessage._id,
              cus_id: existingMessage.cus_id,
              username: sender.username,
              email: sender.email,
              image: sender.image,
            },
          },
        }
      ),
      User.updateOne(
        { _id: receiver._id },
        {
          $push: {
            notifications: {
              sender: sender._id,
              chatID: existingMessage._id,
              cus_id: existingMessage.cus_id,
              senderUsername: sender.username,
              senderEmail: sender.email,
              senderImage: sender.image,
              body: mainData.body,
            },
          },
        }
      ),
    ]);
    console.log(result1, result2);
    res.status(201).json(mainData);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error.message });
  }
};

//Delete Message
const deleteMessages = async (req, res) => {
  try {
    const { messageId } = req.query;
    const { senderId, receiverId } = req.body;

    const message = await Message.findOne({
      "messages._id": messageId,
      sender: senderId,
      receiver: receiverId,
    });

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
    //
    message.messages = message.messages.filter(
      (msg) => msg._id.toString() !== messageId
    );

    await message.save();

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default async function handler(req, res) {
  await connectMongo();
  if (req.method == "GET") {
    await getAllMessages(req, res);
  } else if (req.method == "POST") {
    await postMessages(req, res);
  } else if (req.method == "DELETE") {
    await deleteMessages(req, res);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

// User.updateOne(
//   { _id: sender._id },
//   {
//     $addToSet: {
//       messages: {
//         sender: receiver._id,
//         chatID: existingMessage._id,
//         cus_id: existingMessage.cus_id,
//         senderUsername: receiver.username,
//         senderEmail: receiver.email,
//         senderImage: receiver.image,
//       },
//     },
//   }
// );
// User.updateOne(
//   { _id: receiver._id },
//   {
//     $addToSet: {
//       messages: {
//         sender: sender._id,
//         chatID: existingMessage._id,
//         cus_id: existingMessage.cus_id,
//         senderUsername: sender.username,
//         senderEmail: sender.email,
//         senderImage: sender.image,
//       },
//     },
//   }
// );
