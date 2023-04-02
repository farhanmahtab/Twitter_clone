import { CogIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../styles/Feed.module.css";
import Post from "./Post";
import PostBox from "./PostBox";

export default function Feed({ post }) {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  //console.log(post);
  //console.log(session?.user);
  useEffect(() => {
    setPosts(post);
  }, []);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const res = await fetch("/api/post");
  //     const data = await res.json();
  //     setPosts(data.posts);
  //   };
  //   fetchPosts();
  // }, []);

  return (
    <div className={styles.main}>
      <div className={styles.homeBar}>
        <h2>Home</h2>
        {/* <CogIcon className={styles.homeBarIcon} /> */}
      </div>
      {session && <PostBox setPosts={setPosts} />}
      {posts.map((post) => {
        return <Post key={post._id} post={post} />;
      })}
    </div>
  );
}
