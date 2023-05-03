import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Feed.module.css";
import Post from "./Post";
import PostBox from "./PostBox";
import PostRetweet from "./PostRetweet";
import RetweetPost from "./PostRetweet";

export default function Feed({ post }) {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);

  useEffect(() => {
    setPosts(post);
  }, []);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/api/post/posts?page=${page}`);
        const data = await res.json();
        console.log(data.posts);
        setPosts((prevPosts) => [...prevPosts, ...data.posts]);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
    console.log("useEffect");
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
  //console.log(post);
  return (
    <div className={styles.main}>
      <div className={styles.homeBar}>
        <h2>Home</h2>
        {/* <CogIcon className={styles.homeBarIcon} /> */}
      </div>
      {session && <PostBox setPosts={setPosts} allPost={posts} />}

      {posts.map((post) => {
        if (post.typeofTweet === "retweet") {
          return (
            <RetweetPost
              key={post._id}
              post={post}
              setPosts={setPosts}
              posts={posts}
            />
          );
        } else {
          return (
            <Post
              key={post._id}
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
