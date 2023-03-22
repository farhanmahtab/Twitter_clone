import {
  ChartSquareBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import React from "react";
import Image from "next/image";
import styles from "../styles/Post.module.css";
function Post({ post }) {
  return (
    <div className={styles.postMain}>
      <Image
        src={post.userImage}
        width="50"
        height="50"
        className={styles.profileImage}
      />
      <div className={styles.RightDiv}>
        {/* Username and Handle */}
        <div className={styles.rightBar}>
          <div className={styles.nameBar}>
            <h4>{post.name}</h4>
            <span>{post.username}</span>
            <div className={styles.dot}></div>
            <span>{post.timestamp}</span>
          </div>
          {/* dot icon */}
          <DotsHorizontalIcon className={styles.icon} />
        </div>

        {/* post Image */}
        <p>{post.text}</p>
        {post.img && <img src={post.img} className={styles.postImage} />}

        {/* Icons */}
        <div className={styles.iconsBottom}>
          <div className={styles.iconDiv}>
            <ChatIcon className={styles.icon} />
            <h4>20</h4>
          </div>
          <div className={styles.iconDiv}>
            <TrashIcon className={styles.icon} />
          </div>
          <div className={styles.iconDiv}>
            <HeartIcon className={styles.icon} />
            <h4>50</h4>
          </div>
          <div className={styles.iconDiv}>
            <ShareIcon className={styles.icon} />
            <h4>20</h4>
          </div>
          <div className={styles.iconDiv}>
            <ChartSquareBarIcon className={styles.icon} />
            <h4>200</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
