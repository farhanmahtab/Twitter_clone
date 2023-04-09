import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import styles from "../styles/Feed.module.css";
import Post from "./Post";
import PostBox from "./PostBox";

export default function Feed({ post }) {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setPosts(post);
  }, []);
  //console.log(post);
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
