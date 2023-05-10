import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./Message.module.css";
import styleList from "../messageList/MessageList.module.css";
import Loader from "@/components/common/loader/Loader";
import { getUserbyEmailorID } from "@/helper/helperFunc/frontEnd";
import Avatar from "@/components/common/avatar/avatar";
import { useSession } from "next-auth/react";
import { RecentMessageContext } from "@/providers/RecentMessageProvider";
import MessageComponent from "./messageComponent";
import deleteNotification from "@/helper/frontend/deleteNotification";
import { format } from "date-fns";
import MessagePortion from "./MessagePortion";
import MessageInput from "./MessageInput";
import Image from "next/image";
import { getMessages } from "@/actionFiles/message";

export default function Messages({ receiver, email }) {
  const [profile, setProfile] = useState(receiver);
  const [recentmessages, setRecentMessages] = useContext(RecentMessageContext);
  const session = useSession();

  const senderId = session.data?.user.id;
  const receiverId = receiver?._id;

  const deleteNotificationState = async () => {
    setRecentMessages((state) => {
      const newState = { ...state };
      newState.latestMessages = state.latestMessages.filter(
        (el) => el.sender !== receiver._id
      );
      if (newState.latestMessages.length == 0) {
        newState.showNotification = false;
      }
      return newState;
    });
  };
  useEffect(() => {
    if (session.data) {
      deleteNotificationState();
      deleteNotification(session.data?.user.id, receiver._id);
    }

    return () => {};
  }, [setRecentMessages, receiver, session.data]);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    getMessages(senderId, receiverId, setRecentMessages);
    if (session.data && receiver) {
      console.log(receiver);
      getMessages();
    }
    setProfile({ ...receiver });

    return () => {};
  }, [session.data, setRecentMessages, receiver]);

  return (
    <section className={style.messages}>
      {profile ? (
        profile ? (
          <>
            <div className={styleList.glassPortion}>
              <div className={styleList.header}>
                <Image
                  src={profile.profilePicture}
                  className={style.image}
                  height="45"
                  width="45"
                  alt="user-image"
                ></Image>
                {profile && (
                  <h3 className={styleList.topName}>{profile.username} </h3>
                )}
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
