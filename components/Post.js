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

function Post({ post }) {
  const { data: session } = useSession();
  const router = useRouter();
  //console.log(session?.user);
  const formatTime = formatDistanceToNow(new Date(post.createdAt));
  //console.log(post.createdBy._id);
  const handleDelete = async () => {
    console.log(post._id);
    try {
      const response = await fetch(`/api/post/${post._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        // Call the onDelete function passed as a prop to remove the post from the parent component's state
        console.log(post._id, " is Deleted");
      } else {
        console.error(`Failed to delete post with ID ${post._id}`);
      }
    } catch (error) {
      console.error(error);
    }
    router.replace("/");
  };
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
            <h4 onClick={() => router.push(`/profile/${post.createdBy._id}`)}>
              {post.createdBy.name}
            </h4>
            <span>{post.createdBy.username}</span>
            <div className={styles.dot}></div>
            <span>{formatTime}</span>
          </div>
          {/* dot icon */}
          <DotsHorizontalIcon className={styles.icon} />
        </div>
        {/* <Link href={`/post/${post._id}`}> */}
        <div onClick={() => router.push(`/post/${post._id}`)}>
          <p>{post.body}</p>
        </div>

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
            <HeartIcon className={styles.icon} />
            <h4>{post.NumberOfReact}</h4>
          </div>
          {session && session?.user.id === post?.createdBy._id && (
            <div className={styles.iconDiv}>
              <TrashIcon
                className={styles.icon}
                onClick={() => handleDelete()}
              />
            </div>
          )}

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
