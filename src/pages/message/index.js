import MessageList from "@/components/message/messageList/MessageList";
import Messages from "@/components/message/messages/Messages";
import { getToken } from "firebase/messaging";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import connectMongo from "@/Utils/db";
import User from "@/models/User";
import { authOptions } from "@/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Sidebar from "@/components/Sidebar";

export async function getServerSideProps(context) {
  return {
    props: {
      receiver: null,
      messages: null,
    },
  };
  const { senderId, receiverId } = context.query;
  console.log(senderId, receiverId);
  let session;
  if (!senderId) {
    session = await getServerSession(
      context.req,
      context.res,
      authOptions(context.req)
    );
  }
  try {
    await connectMongo();
    // console.log(session.user.id);
    const [user, messages] = await Promise.all([
      User.findById(receiverId).select({
        _id: 1,
        username: 1,
        image: 1,
        email: 1,
      }),
      User.findById(senderId ? senderId : session.user.id).select({
        messages: 1,
      }),
    ]);

    console.log(user);
    console.log(messages);

    return {
      props: {
        receiver: user ? JSON.parse(JSON.stringify(user)) : null,
        messages: messages
          ? JSON.parse(JSON.stringify(messages.messages))
          : null,
      },
    };
  } catch (e) {
    console.log(e);
  }
  // return {
  //   props: {
  //     receiver: null,
  //     messages: null,
  //   },
  // };
}

export default function Message({ receiver, messages }) {
  const session = useSession();
  const [selectedID, setselectedID] = useState(receiver);

  useEffect(() => {
    async function requestPermission() {
      const permission = await Notification.requestPermission();
      const messaging = getMessaging();

      if (permission === "granted") {
        // Generate Token
        const token = await getToken(messaging, {
          vapidKey: process.env.FCM_VAPID_KEY,
        });

        try {
          const res = await fetch("/api/users/token", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              _id: session.data.user.id,
              token,
            }),
          });

          const result = await res.json();
          console.log(result);
        } catch (error) {}
      } else if (permission === "denied") {
        alert("You denied for the notification");
      }
    }

    if (session.data) {
      requestPermission();
    }
  }, [session.data]);
  return (
    <>
      <Head>
        <title>twitter</title>
        <link rel="icon" href="/Twitter-logo.ico" type="image/icon type"></link>
      </Head>
      <main className="body">
        <Sidebar />
        <MessageList
          messages={messages}
          setselectedID={setselectedID}
        ></MessageList>
        {selectedID && <Messages receiver={selectedID}></Messages>}
      </main>
      <style jsx>{`
        .body {
          width: 100%;
          height: 100vh;
          height: 100dvh;
          display: flex;
          overflow: hidden;
        }
        .left {
          margin-right: 1rem;
        }
      `}</style>
    </>
  );
}
