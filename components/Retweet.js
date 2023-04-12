import { ChatIcon, HeartIcon, TrashIcon } from "@heroicons/react/outline";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Styles from "../styles/comment.module.css";
import styles from "../styles/modal.module.css";

const Retweet = () => {
  const router = useRouter();
  const pathCur = router.asPath;
  const { postId } = router.query;
  //console.log(postId)
  const { data: session } = useSession();
  const [tweet, setTweet] = useState("");
  const image = session?.user.image || session?.user.picture;
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("api/post/retweet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user.email,
          postId: postId,
          postBody: tweet,
        }),
      });
      const data = await response.json();
      console.log(data);
      setTweet("");
    } catch (error) {
      console.error(error);
    }
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
          </div>
        </div>
        <div>
          <textarea
            className={Styles.textarea}
            value={tweet}
            placeholder="Add something to retweet"
            onChange={(e) => setTweet(e.target.value)}
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
              disabled={!tweet.trim()}
              className={Styles.commentButton}
              onClick={handleSubmit}
            >
              Retweet
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Retweet;
