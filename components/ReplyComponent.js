import React, { useState } from "react";
import styles from "../styles/Post.module.css";
import { FaReply } from "react-icons/fa";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

const ReplyComponent = ({ reply }) => {
  const img = reply.createdBy?.profilePicture;
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
          <h4>{reply.createdBy?.name}</h4>
          <span>{reply.createdBy?.username}</span>
          <FaReply className={styles.miniIcon} />
          <span>replied : {formatTime}</span>
        </div>
        <p>{reply.body}</p>
        <div className={styles.iconsBottom}></div>
      </div>
    </div>
  );
};

export default ReplyComponent;
