import React from "react";
import Image from "next/image";
import profilePicture from "../public/Resource/pp.jpeg";
import styles from "../styles/PostBox.module.css";
import {
  CalendarIcon,
  EmojiHappyIcon,
  MapIcon,
  PhotographIcon,
} from "@heroicons/react/outline";

function PostBox() {
  return (
    <div className={styles.PostBoxMain}>
      <div className={styles.imageDiv}>
        <Image
          src={profilePicture}
          className={styles.image}
          height="50"
          width="50"
          alt="user-image"
        ></Image>
      </div>

      <div className={styles.postBoxtextArea}>
        <div >
          <textarea className={styles.textArea} rows="2" col="15"placeholder="What's Happening?" />
        </div>
        <div className={styles.iconbar}>
          <div>
            <PhotographIcon className={styles.icon} />
            <EmojiHappyIcon className={styles.icon} />
            <MapIcon className={styles.icon} />
            <CalendarIcon className={styles.icon} />
          </div>
          <button className={styles.postBoxButton}>Tweet</button>
        </div>
      </div>
    </div>
  );
}

export default PostBox;
