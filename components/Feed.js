import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Feed.module.css";
import Post from "./Post";
import PostBox from "./PostBox";
import RetweetPost from "./PostRetweet";
import { fetchPosts } from "@/actionFiles/FetchActions";

export default function Feed({ posts, setPosts }) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);

  useEffect(() => {
    setPosts(posts);
  }, []);
  useEffect(() => {
    fetchPosts(page, setPosts, setLoading);
  }, [page]);

  const observer = useRef(
    typeof IntersectionObserver !== "undefined" &&
      new IntersectionObserver(
        (entries) => {
          const firstEntry = entries[0];
          if (firstEntry.isIntersecting && !loading) {
            setPage((prevPage) => prevPage + 1);
          }
        },
        { rootMargin: "20px" }
      )
  );
  useEffect(() => {
    const currentLoaderRef = loaderRef.current;
    if (currentLoaderRef) {
      observer.current.observe(currentLoaderRef);
    }
    return () => {
      if (currentLoaderRef) {
        observer.current.unobserve(currentLoaderRef);
      }
    };
  }, [loaderRef]);
  return (
    <div className={styles.main}>
      <div className={styles.homeBar}>
        <h2>Home</h2>
      </div>
      {session && <PostBox setPosts={setPosts} allPost={posts} />}

      {posts.map((post, index) => {
        if (post?.typeofTweet === "retweet") {
          return (
            <RetweetPost
              key={`${post?._id}-${index}`}
              post={post}
              setPosts={setPosts}
              posts={posts}
            />
          );
        } else {
          return (
            <Post
              key={`${post?._id}-${index}`}
              post={post}
              setPosts={setPosts}
              posts={posts}
            />
          );
        }
      })}
      <div ref={loaderRef}>
        <h1>load</h1>
      </div>
    </div>
  );
}
