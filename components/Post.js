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
import { useSession } from "next-auth/react";
function Post({ post }) {
  const { data: session } = useSession();
  console.log(session?.user.image);
  return (
    <div className={styles.postMain}>
      <Image
        src={post.userImage}
        width="50"
        height="50"
        className={styles.profileImage}
        alt="user image"
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
        <p>{post.body}</p>
        {post.img && (
          <img src={post.PostImage} alt="post Image" className={styles.postImage} />
        )}

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
