import React from "react";
import { formatDistanceToNow } from "date-fns";
import styles from "../styles/Post.module.css";
import {
  ChartSquareBarIcon,
  ChatIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import CommentReply from "./CommentReply";
import { useSession } from "next-auth/react";

export default function PostComment({ comment, postId }) {
  const { data: session } = useSession();
  const router = useRouter();
  const pathCur = router.asPath;
  const formatTime = formatDistanceToNow(new Date(comment.createdAt));

  const handleDelete = async () => {
    console.log(comment._id);
  };
  const replies = comment.replies;
  return (
    <div>
      <div className={styles.commentMain}>
        <Image
          src={comment.createdBy.profilePicture}
          width="50"
          height="50"
          className={styles.profileImage}
          alt="user image"
        />
        <div className={styles.RightDiv}>
          <div className={styles.nameBar}>
            <h4>{comment.createdBy.name}</h4>
            <span>{comment.createdBy.username}</span>
            <div className={styles.dot}></div>
            <span>commented : {formatTime}</span>
          </div>
          <p>{comment.body}</p>
          <div className={styles.iconsBottom}>
            {session && (
              <div className={styles.iconDiv}>
                <ChatIcon
                  className={styles.icon}
                  onClick={() =>
                    router.push({
                      pathname: pathCur,
                      query: {
                        modal: "reply",
                        commentId: comment._id,
                        postId: postId,
                      },
                    })
                  }
                />
                <span>{replies.length}</span>
              </div>
            )}

            {}
            {/* {session && session?.user.id === comment?.createdBy?._id && (
              <div className={styles.iconDiv}>
                <TrashIcon
                  className={styles.icon}
                  onClick={() => handleDelete()}
                />
              </div>
            )} */}

            <div className={styles.iconDiv}>
              <HeartIcon className={styles.icon} />
            </div>
            <div className={styles.iconDiv}>
              <ShareIcon className={styles.icon} />
            </div>
            <div className={styles.iconDiv}>
              <ChartSquareBarIcon className={styles.icon} />
              <span>10</span>
            </div>
          </div>
        </div>
      </div>
      <CommentReply reply={replies} />
    </div>
  );
}
