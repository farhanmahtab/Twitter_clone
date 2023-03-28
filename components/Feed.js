import { CogIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import React from "react";
import styles from "../styles/Feed.module.css";
import Post from "./Post";
import PostBox from "./PostBox";

export default function Feed() {
  const { data: session } = useSession();
  const post = [
    {
      id: "1",
      name: "Farhan Mahi",
      username: "@ironblood",
      userImage: "/Resource/pp.jpeg",
      img: "/Resource/post_image1.jpeg",
      text: "Wow",
      timestamp: "1hr Ago",
    },
    {
      id: "4",
      name: "Mazhar Ali",
      username: "@saudi_chadGPT",
      userImage: "/Resource/user.jpeg",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      timestamp: "15 minutes Ago",
    },
    {
      id: "2",
      name: "Maruf Pulok",
      username: "@noakhailla",
      userImage: "/Resource/maruf.jpeg",
      img: "/Resource/post_image2.jpeg",
      text: "Awesome",
      timestamp: "2hr Ago",
    },
    {
      id: "3",
      name: "Anindo Sucker",
      username: "@Sucker",
      userImage: "/Resource/anindo.jpeg",
      img: "/Resource/post_image3.jpeg",
      text: "Taka Nai",
      timestamp: "59 minutes Ago",
    },
  ];
  return (
    <div className={styles.main}>
      <div className={styles.homeBar}>
        <h2>Home</h2>
        {/* <CogIcon className={styles.homeBarIcon} /> */}
      </div>
      {session && <PostBox />}

      {post.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
