import React, { useRef, useState } from "react";
import Image from "next/image";
import styles from "../styles/PostBox.module.css";
import {
  CalendarIcon,
  EmojiHappyIcon,
  MapIcon,
  PhotographIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function PostBox({ setPosts }) {
  const router = useRouter();
  const filePickerRef = useRef(null);
  const { data: session } = useSession();
  //console.log(session?.user);
  const image = session?.user.image || session?.user.picture;

  const [input, setInput] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(input);
    try {
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user.email,
          body: input,
        }),
      });
      const data = await response.json();
      console.log(data);

      const res1 = await fetch("/api/post");
      const data1 = await res1.json();
      setPosts(data1.posts);

      setInput("");
    } catch (error) {
      console.error(error);
    }
  };

  const addImageToPost = async (e) => {
    console.log("image uploader");
  };
  return (
    <form>
      <div className={styles.PostBoxMain}>
        <div className={styles.imageDiv}>
          <Image
            src={image}
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
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className={styles.iconbar}>
            <div onClick={() => filePickerRef.current.click()}>
              <PhotographIcon className={styles.icon} />
              <input type="file" hidden ref={filePickerRef} />
            </div>
            <div>
              <EmojiHappyIcon className={styles.icon} />
              <MapIcon className={styles.icon} />
              <CalendarIcon className={styles.icon} />
            </div>
            <button
              disabled={!input.trim()}
              className={styles.postBoxButton}
              onClick={handleSubmit}
            >
              Tweet
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PostBox;
