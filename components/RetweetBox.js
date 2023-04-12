import React from "react";
import styles from "../styles/Post.module.css";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const RetweetBox = ({ post }) => {
  const router = useRouter();
  //   const formatTime = formatDistanceToNow(new Date(post?.createdAt));
  //console.log(formatTime);

  const { data: session } = useSession();
  return (
    <div className={styles.retweetMain}>
      <div className={styles.retweetDiv}>
        <Image
          src={post?.createdBy.profilePicture}
          width="50"
          height="50"
          className={styles.profileImage}
          alt="user image"
        />
        <div className={styles.rightBar}>
          <div className={styles.nameBar}>
            <h4 onClick={() => router.push(`/profile/${post?.createdBy._id}`)}>
              {post?.createdBy.name}
            </h4>
            <span>{post?.createdBy.username}</span>
            <div className={styles.dot}></div>
            {/* <span>{formatTime}</span> */}
          </div>

          {/* dot icon */}
        </div>
      </div>
      <div className={styles.retweetBody}>
        <div className={styles.textBody}>
          <p>{post?.body}</p>
        </div>
        {post?.PostImage && (
          <Image
            src={`/images/${post?.PostImage}`}
            width={400}
            height={350}
            alt="post Image"
            className={styles.postImage}
          />
        )}
      </div>
    </div>
  );
};

export default RetweetBox;
