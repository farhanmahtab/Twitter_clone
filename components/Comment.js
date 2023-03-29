import { ChatIcon, HeartIcon, TrashIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Styles from "../styles/comment.module.css";
import styles from "../styles/modal.module.css";

const Comment = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: session } = useSession();
  //   console.log(session?.user.id);
  const [comment, setComment] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(comment, "postID : ", postId, "UserId : ", session?.user.email);
    try {
      const response = await fetch("/api/post/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user.email,
          post: postId,
          body: comment,
        }),
      });
      const data = await response.json();
      console.log(data);
      setComment("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form class={styles.form}>
      {/* <img class="comment-avatar" src={session?.user} alt="User Avatar"> */}
      <div class={Styles.comment_content}>
        <div class={Styles.comment_Header}>
          <span class={Styles.comment_author}>John Doe</span>
          <span class={Styles.comment_date}>2 hours ago</span>
        </div>
        <div class={Styles.comment_body}>
          This is the comment body text. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed ac dolor vel ipsum euismod malesuada a sit amet
          sapien. Sed porttitor, elit a hendrerit dictum, elit elit ullamcorper
          libero, et tempus nisi purus ut est.
        </div>
        <textarea
          className={Styles.textarea}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div class={Styles.iconsBottom}>
          <span class={Styles.iconsBottom}>
            <ChatIcon className={Styles.icon} />
          </span>
          <span class={Styles.iconsBottom}>
            <HeartIcon className={Styles.icon} />
          </span>
          <span class={Styles.iconsBottom}>
            <TrashIcon className={Styles.icon} />
          </span>
          <button
            disabled={!comment.trim()}
            className={Styles.commentButton}
            onClick={handleSubmit}
          >
            reply
          </button>
        </div>
      </div>
    </form>
  );
};

export default Comment;
