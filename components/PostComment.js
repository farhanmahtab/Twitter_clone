import React from "react";
import { formatDistanceToNow } from "date-fns";
import styles from "../styles/Post.module.css";
import {
  ChartSquareBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/outline";
export default function PostComment({ comment }) {
  const formatTime = formatDistanceToNow(new Date(comment.createdAt));
  return (
    <div className={styles.commentMain}>
      <div className={styles.RightDiv}>
        <div className={styles.nameBar}>
          <h4>{comment.author.name}</h4>
          <span>{comment.author.username}</span>
          <div className={styles.dot}></div>
          <span>{formatTime}</span>
        </div>
        <p>{comment.body}</p>
        <div className={styles.iconsBottom}>
          <div className={styles.iconDiv}>
            <ChatIcon
              className={styles.icon}
              onClick={() => {
                router.replace(`?modal=comment&postId=${post._id}`);
              }}
            />
          </div>

          <div className={styles.iconDiv}>
            <TrashIcon className={styles.icon} />
          </div>
          <div className={styles.iconDiv}>
            <HeartIcon className={styles.icon} />
          </div>
          <div className={styles.iconDiv}>
            <ShareIcon className={styles.icon} />
          </div>
          <div className={styles.iconDiv}>
            <ChartSquareBarIcon className={styles.icon} />
          </div>
        </div>
      </div>
    </div>
  );
}
