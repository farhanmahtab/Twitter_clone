import React, { useState } from "react";
import styles from "../styles/Post.module.css";
import {
  ChartSquareBarIcon,
  ChatIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

const ReplyComponent = ({ reply }) => {
  const img = reply.author.profilePicture;
  //console.log(reply.createdAt);
  const formatTime = formatDistanceToNow(new Date(reply.createdAt));
  return (
    <div className={styles.replyMain}>
      <Image
        src={img}
        width="50"
        height="50"
        className={styles.profileImage}
        alt="user image"
      />
      <div className={styles.RightDiv}>
        <div className={styles.nameBar}>
          {/* <h4>{comment.author.name}</h4> */}
          <h4>{reply.author.name}</h4>
          {/* <span>{comment.author.username}</span> */}
          <span>{reply.author.username}</span>
          <div className={styles.dot}></div>
          <span>replied : {formatTime}</span>
        </div>
        <p>{reply.body}</p>
        <div className={styles.iconsBottom}>
          <div className={styles.iconDiv}>
            <HeartIcon className={styles.icon} />
          </div>
          {/* <div className={styles.iconDiv}>
            <TrashIcon className={styles.icon} />
          </div> */}

          <div className={styles.iconDiv}>
            <ChartSquareBarIcon className={styles.icon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyComponent;
