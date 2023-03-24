import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/PostBox.module.css";
import {
  CalendarIcon,
  EmojiHappyIcon,
  MapIcon,
  PhotographIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";

function PostBox() {
  const { data: session } = useSession();
  const [input,setInput] = useState("");
  console.log(session?.user);
 const img = session?.user.image;
  return (
    <div className={styles.PostBoxMain}>
      <div className={styles.imageDiv}>
        <Image
          src={img}
          className={styles.image}
          height="50"
          width="50"
          alt="user-image"
        ></Image>
      </div>

      <div className={styles.postBoxtextArea}>
        <div>
          <textarea
            className={styles.textArea}
            rows="2"
            col="15"
            placeholder="What's Happening?"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        </div>
        <div className={styles.iconbar}>
          <div>
            <PhotographIcon className={styles.icon} />
            <EmojiHappyIcon className={styles.icon} />
            <MapIcon className={styles.icon} />
            <CalendarIcon className={styles.icon} />
          </div>
          <button disabled={!input?.trim()} className={styles.postBoxButton}>Tweet</button>
        </div>
      </div>
    </div>
  );
}

export default PostBox;
