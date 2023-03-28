import { CogIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import styles from "../styles/Feed.module.css";
import Post from "./Post";
import PostBox from "./PostBox";

export default function Feed() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
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
      userImage: "",
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
      {/* {postResult.posts.map((post) => (
        <Post key={post.id} post={postResult} />
      ))} */}
        {posts.map((post) => {
        return <Post key={post._id} post={post} />
      })}
      {/* {post.map((post) => (
        <Post key={post.id} post={post} />
      ))} */}
    </div>
  );
}

// export async function getServerSideProps() {
//   // Get posts
//   const postResult = await fetch("http://localhost:3000/api/post").then(
//     (res) => res.json()
//   )
//   return {
//     props: {
//       postResult
//     },
//   };
// }
