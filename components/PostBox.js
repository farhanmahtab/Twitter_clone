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
  const [selectedImages, setSelectedImages] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(input);
    const formData = new FormData();
    formData.append("email", session?.user.email);
    formData.append("body", input);
    selectedImages.forEach((image) => {
      formData.append("PostImage", image);
    });
    try {
      const response = await fetch("/api/post", {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: formData,
      });
      const data = await response.json();
      console.log(data);

      const res1 = await fetch("/api/post");
      const data1 = await res1.json();
      setPosts(data1.posts);
      setSelectedImages([]);
      setInput("");
    } catch (error) {
      console.error(error);
    }
  };
  const handleRemoveImage = () => {
    setSelectedImages([]);
  };

  return (
    <form onSubmit={handleSubmit}>
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
            <div>
              <label htmlFor="image-upload">
                <PhotographIcon className={styles.icon} />
                <input
                  id="image-upload"
                  type="file"
                  hidden
                  onChange={({ target }) => {
                    const files = target.files;
                    const newImages = [...selectedImages];
                    for (let i = 0; i < files.length; i++) {
                      newImages.push(files[i]);
                    }
                    setSelectedImages(newImages);
                  }}
                />
              </label>
              {selectedImages.length > 0 && (
                <div className={styles.selectedImageContainer}>
                  {selectedImages.map((selectedImage, index) => (
                    <div key={index} className={styles.selectedImageContainer}>
                      <Image
                        width={350}
                        height={200}
                        src={URL.createObjectURL(selectedImage)}
                        className={styles.selectedImage}
                        alt="Selected Image"
                      />

                      <div
                        className={styles.close}
                        onClick={() => {
                          handleRemoveImage();
                        }}
                      >
                        &times;
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div></div>
            </div>
            <div>
              <EmojiHappyIcon className={styles.icon} />
              <MapIcon className={styles.icon} />
              <CalendarIcon className={styles.icon} />
            </div>
            <button
              disabled={!input.trim()}
              className={styles.postBoxButton}
              type="submit"
              onClick={() => router.push(`/`)}
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
