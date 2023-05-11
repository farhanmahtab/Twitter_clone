import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import {
  InboxIcon,
  HomeIcon,
  BellIcon,
  HashtagIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import { RiLogoutBoxRLine } from "react-icons/ri";

import SideBarMenuItems from "./SideBarMenuItems";
import styles from "../styles/Sidebar.module.css";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { getMessaging, onMessage } from "firebase/messaging";
import { RecentMessageContext } from "@/providers/RecentMessageProvider";
import { fetchUserById } from "@/actionFiles/FetchActions";

function Sidebar() {
  const router = useRouter();
  const { data: session } = useSession();
  const [user, setUser] = useState();
  const [recentMessage, setRecentMessage] = useContext(RecentMessageContext);
  const [notification, setNotification] = useState([]);
  const image = user?.profilePicture;
  const userID = session?.user.id;
  //console.log(userID);
  useEffect(() => {
    fetchUserById(userID, setUser);
  });
  useEffect(() => {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      const msg = JSON.parse(payload.data.message);
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
        return { ...state, ...newRecentMsg };
      });
      setNotification((state) => [msg, ...state]);
    });
    return () => {};
  }, [setRecentMessage, router.query.receiverId]);

  return (
    <div className={styles.main}>
      {/* logo */}
      <div className={styles.logo} onClick={() => router.push("/")}>
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
              {!session ? <h4>User</h4> : <h4>{user?.name}</h4>}
              {!session ? <p>@username</p> : <p>@{user?.username}</p>}
            </div>
          </div>
          <div className={styles.logout}>
            {/* <ChevronRightIcon
              className={styles.icon}
              onClick={() => {
                signOut({
                  callbackUrl: `${window.location.origin}`,
                });
              }}
            /> */}
            <RiLogoutBoxRLine
              className={styles.icon}
              onClick={() => {
                signOut({
                  callbackUrl: `${window.location.origin}`,
                });
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
