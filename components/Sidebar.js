import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import {
  InboxIcon,
  HomeIcon,
  BellIcon,
  BookmarkAltIcon,
  HashtagIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import SideBarMenuItems from "./SideBarMenuItems";
import styles from "../styles/Sidebar.module.css";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { getMessaging, onMessage } from "firebase/messaging";
import { onMessageListener } from "@/helper/Firebase/OnMessage";
import { RecentMessageContext } from "@/providers/RecentMessageProvider";

function Sidebar() {
  const router = useRouter();
  const { data: session } = useSession();
  const [recentMessage, setRecentMessage] = useContext(RecentMessageContext);
  const [notification, setNotification] = useState([]);

  const image = session?.user.image || session?.user.picture;
  const userID = session?.user.id;
  //console.log(userID);

  useEffect(() => {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      const msg = JSON.parse(payload.data.message);
      console.log(router.query.receiverId);
      console.log(msg.receiver);
      console.log(msg.sender);
      const newRecentMsg = {
        showNotification: true,
        latestMessage: msg,
      };
      if (router.query.receiverId && router.query.receiverId == msg.receiver) {
        newRecentMsg.messages;
      }
      setRecentMessage((state) => {
        if (router.query.receiverId && router.query.receiverId == msg.sender) {
          console.log("is");
          newRecentMsg.messages = [...state.messages, msg];
        } else {
          console.log("not");
          newRecentMsg.messages = [...state.messages];
        }
        console.log(newRecentMsg);
        return newRecentMsg;
      });
      setNotification((state) => [msg, ...state]);
    });
    return () => {};
  }, [setRecentMessage, router.query.receiverId]);

  return (
    <div className={styles.main}>
      {/* logo */}
      <div className={styles.logo}>
        <Image
          width="30"
          height="30"
          src="/Resource/Twitter-logo.ico"
          alt="twitter-logo"
        ></Image>
      </div>

      {/* menu */}
      <div onClick={() => router.push("/")}>
        <SideBarMenuItems text="Home" Icon={HomeIcon} />
      </div>
      <SideBarMenuItems text="Explore" Icon={HashtagIcon} />
      {session && (
        <>
          <SideBarMenuItems text="Notification" Icon={BellIcon} />
          <div onClick={() => router.push("/message")}>
            <div className={styles.message}>
              {recentMessage.showNotification && (
                <span className={styles.notificaion}></span>
              )}
              <SideBarMenuItems text="Messages" Icon={InboxIcon} />
            </div>
          </div>

          {/* <SideBarMenuItems text="Bookmarks" Icon={BookmarkAltIcon} /> */}
          {/* <SideBarMenuItems text="Lists" Icon={ClipboardCheckIcon} /> */}
          <div onClick={() => router.push(`/profile/${userID}`)}>
            <SideBarMenuItems text="Profile" Icon={UserIcon} />
          </div>
          <SideBarMenuItems text="More" Icon={DotsCircleHorizontalIcon} />

          {/* button */}
          <button className={styles.sideBarButton}>Tweet</button>
        </>
      )}

      {/* profile */}
      {session && (
        <div className={styles.profile}>
          <div className={styles.profileHover}>
            <Image
              src={image}
              className={styles.image}
              height="45"
              width="45"
              alt="user-image"
            ></Image>
            <div className={styles.profileUsn}>
              {!session ? <h4>User</h4> : <h4>{session.user.name}</h4>}
              {!session.user.username ? (
                <p>@username</p>
              ) : (
                <p>@{session.user.username}</p>
              )}
            </div>
          </div>
          <ChevronRightIcon className={styles.icon} onClick={() => signOut()} />
        </div>
      )}
    </div>
  );
}

export default Sidebar;
