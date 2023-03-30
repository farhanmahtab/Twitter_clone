import {
  ChartSquareBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/Post.module.css";
import { useSession } from "next-auth/react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/router";
import Link from "next/link";

function Post({ post }) {
  const { data: session } = useSession();
  const router = useRouter();
  //console.log(post.createdBy.profilePicture);
  //console.log(session?.user.image);
  const formatTime = formatDistanceToNow(new Date(post.createdAt));
  return (
    <div className={styles.postMain}>
      <Image
        src={post.createdBy.profilePicture}
        width="50"
        height="50"
        className={styles.profileImage}
        alt="user image"
      />
      <div className={styles.RightDiv}>
        {/* Username and Handle */}
        <div className={styles.rightBar}>
          <div className={styles.nameBar}>
            <h4>{post.createdBy.name}</h4>
            <span>{post.createdBy.username}</span>
            <div className={styles.dot}></div>
            <span>{formatTime}</span>
          </div>
          {/* dot icon */}
          <DotsHorizontalIcon className={styles.icon} />
        </div>
        <Link href={`/post/${post._id}`}>
          <p>{post.body}</p>
        </Link>
        {post.img && (
          <img
            src={post.PostImage}
            alt="post Image"
            className={styles.postImage}
          />
        )}

        {/* Icons */}
        <div className={styles.iconsBottom}>
          <div className={styles.iconDiv}>
            <ChatIcon
              className={styles.icon}
              onClick={() => {
                router.replace(`?modal=comment&postId=${post._id}`);
              }}
            />
            <h4>{post?.Comment?.length}</h4>
          </div>
          <div className={styles.iconDiv}>
            <TrashIcon className={styles.icon} />
          </div>
          <div className={styles.iconDiv}>
            <HeartIcon className={styles.icon} />
            <h4>{post.NumberOfReact}</h4>
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
