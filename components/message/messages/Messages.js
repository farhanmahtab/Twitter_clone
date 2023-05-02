import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./Message.module.css";
import styleList from "../messageList/MessageList.module.css";
import Loader from "@/components/common/loader/Loader";
import { getUserbyEmailorID } from "@/helper/helperFunc/frontEnd";
import Avatar from "@/components/common/avatar/avatar";
import { useSession } from "next-auth/react";
import { RecentMessageContext } from "@/providers/RecentMessageProvider";
import MessageComponent from "./messageComponent";
import { format } from "date-fns";
import MessagePortion from "./MessagePortion";
import MessageInput from "./MessageInput";
export default function Messages({ _id, email }) {
  const [profile, setProfile] = useState(_id);

  const [messages, setMessages] = useState();
  const [recentmessages, setRecentMessages] = useContext(RecentMessageContext);
  const session = useSession();

  useEffect(
    () => {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      async function getMessages() {
        try {
          const response = await fetch(
            `/api/v2/messages?senderId=${session.data?.user._id}&receiverId=${_id?._id}`,
            requestOptions
          );
          const result = await response.json();

          if (result) {
            setRecentMessages((state) => {
              return { ...state, messages: result.messages };
            });
          } else {
            setRecentMessages((state) => {
              return { ...state, messages: [] };
            });
          }
        } catch (error) {}
      }

      if (session.data && _id) {
        getMessages();
      }
      setProfile({ ..._id });

      return () => {};
    },
    [session.data, setRecentMessages, _id],
    session.data
  );

  const handleSendMsg = async (e) => {
    e.preventDefault();

    setMessages((state) => "");

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      senderEmail: session.data.user.email,
      receiverEmail: profile.email,
      body: messages,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    async function sendRequest() {
      try {
        var response = await fetch(
          "http://localhost:3000/api/v2/messages",
          requestOptions
        );
        var result = await response.json();
        //

        setRecentMessages((state) => {
          return { ...state, messages: result.messages };
        });
      } catch (error) {
        setMessages(error.message);
      }
    }

    await sendRequest();
  };

  return (
    <section className={style.messages}>
      {profile ? (
        profile ? (
          <>
            <div className={styleList.glassPortion}>
              <div className={styleList.header}>
                {profile && <h3>{profile.username} </h3>}
              </div>
            </div>
            {recentmessages.messages && <MessagePortion profile={profile} />}
            <MessageInput profile={profile}></MessageInput>
          </>
        ) : (
          <div>{profile.msg}</div>
        )
      ) : (
        <Loader />
      )}
    </section>
  );
}
