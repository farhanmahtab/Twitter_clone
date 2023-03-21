import React from "react";
import Image from "next/image";
import profilePicture from "../public/Resource/pp.jpeg";
import { BellIcon, HomeIcon, InboxIcon } from "@heroicons/react/solid";
import {
  BookmarkAltIcon,
  ClipboardCheckIcon,
  DotsHorizontalIcon,
  DotsVerticalIcon,
  HashtagIcon,
  UserIcon,
} from "@heroicons/react/outline";
import SideBarMenuItems from "./SideBarMenuItems";
import styles from "../styles/Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.main}>
      {/* logo */}
      <div className={styles.logo}>
        <Image width="30" height="30" src="/Resource/Twitter-logo.ico"></Image>
      </div>

      {/* menu */}
      <SideBarMenuItems text="Home" Icon={HomeIcon} />
      <SideBarMenuItems text="Explore" Icon={HashtagIcon} />
      <SideBarMenuItems text="Notification" Icon={BellIcon} />
      <SideBarMenuItems text="Messages" Icon={InboxIcon} />
      <SideBarMenuItems text="Bookmarks" Icon={BookmarkAltIcon} />
      <SideBarMenuItems text="Lists" Icon={ClipboardCheckIcon} />
      <SideBarMenuItems text="Profile" Icon={UserIcon} />
      <SideBarMenuItems text="More" Icon={DotsVerticalIcon} />

      {/* button */}
      
        <button className={styles.sideBarButton}>Tweet</button>
     

      {/* profile */}
      <div className={styles.profile}>
        <div className={styles.profileHover}>
          <Image
            src={profilePicture}
            className={styles.image}
            height="50"
            width="50"
            alt="user-image"
          ></Image>
          <div className="">
            <h4>Farhan Mahi</h4>
            <p>@ironblood</p>
          </div>
        </div>
      </div>

      <DotsHorizontalIcon className={styles.icon} />
    </div>
  );
}

export default Sidebar;
