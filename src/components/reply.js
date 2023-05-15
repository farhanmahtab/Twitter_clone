import { ChatIcon, HeartIcon, TrashIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Styles from "@/styles/comment.module.css";
import styles from "@/styles/modal.module.css";
import { CommentActions, CommentDispatch } from "@/actionFiles/comments";

//reply modal
const Reply = ({ post, setPost }) => {
  const router = useRouter();
  const commentId = router.query.commentId;
  const postId = router.query.postId;

  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const image = session?.user.image || session?.user.picture;
  const email = session?.user.email;

  const handleSubmit = async (event) => {
    event.preventDefault();
    CommentDispatch({
      type: CommentActions.CommentReply,
      payload: {
        email,
        postId,
        commentId,
        comment,
        setComment,
        post,
        setPost,
      },
    });
    router.push(`/`);
  };

  return (
    <form className={styles.form}>
      <div className={Styles.comment_content}>
        <div className={Styles.commentTop}>
          <Image
            src={image}
            width="50"
            height="50"
            className={Styles.comment_avatar}
            alt="user image"
          />
          <div className={Styles.comment_Header}>
            <span className={Styles.comment_author}>{session?.user.name}</span>
            <span className={Styles.comment_date}>2 hours ago</span>
          </div>
        </div>
        <div>
          <textarea
            className={Styles.textarea}
            value={comment}
            placeholder="Leave a reply"
            onChange={(e) => setComment(e.target.value)}
          />
          <div className={Styles.iconsBottom}>
            <span className={Styles.iconsBottom}>
              <ChatIcon className={Styles.icon} />
            </span>
            <span className={Styles.iconsBottom}>
              <HeartIcon className={Styles.icon} />
            </span>
            <span className={Styles.iconsBottom}>
              <TrashIcon className={Styles.icon} />
            </span>
            <button
              disabled={!comment.trim()}
              className={Styles.commentButton}
              onClick={handleSubmit}
            >
              Reply
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Reply;
