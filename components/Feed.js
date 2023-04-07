import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import styles from "../styles/Feed.module.css";
import Post from "./Post";
import PostBox from "./PostBox";

export default function Feed() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setPosts(post);
  }, []);

  const post = [
    {
      createdBy: "60e12a125149fc3f3d9e8a5", // User ObjectId
      body: "This is post 1",
      PostImage: "/resource/img1.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
      react: [],
      NumberOfReact: 0,
      Comment: [
        {
          createdBy: "60e12a125149fc3f3d9e8a6", // User ObjectId
          body: "This is comment 1 for post 1",
          replies: [
            {
              createdBy: "60e12a125149fc3f3d9e8a7", // User ObjectId
              body: "This is reply 1 for comment 1 of post 1",
            },
            {
              createdBy: "60e12a125149fc3f3d9e8a8", // User ObjectId
              body: "This is reply 2 for comment 1 of post 1",
            },
          ],
        },
        {
          createdBy: "60e12a125149fc3f3d9e8a9", // User ObjectId
          body: "This is comment 2 for post 1",
          replies: [],
        },
      ],
      NumberOfComment: 2,
      retweet: [
        {
          createdBy: "60e12a125149fc3f3d9e8aa", // User ObjectId
          body: "This is retweet 1 for post 1",
        },
        {
          createdBy: "60e12a125149fc3f3d9e8ab", // User ObjectId
          body: "This is retweet 2 for post 1",
        },
      ],
      NumberOfRetweet: 2,
    },
    {
      createdBy: "60e12a125149fc3f3d9e8ac", // User ObjectId
      body: "This is post 2",
      PostImage: "/resource/img2.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
      react: [],
      NumberOfReact: 0,
      Comment: [
        {
          createdBy: "60e12a125149fc3f3d9e8ad", // User ObjectId
          body: "This is comment 1 for post 2",
          replies: [
            {
              createdBy: "60e12a125149fc3f3d9e8ae", // User ObjectId
              body: "This is reply 1 for comment 1 of post 2",
            },
            {
              createdBy: "60e12a125149fc3f3d9e8af", // User ObjectId
              body: "This is reply 2 for comment 1 of post 2",
            },
          ],
        },
        {
          createdBy: "60e12a125149fc3f3d9e8b0", // User ObjectId
          body: "This is comment 2 for post 2",
          replies: [],
        },
      ],
      NumberOfComment: 2,
      retweet: [
        {
          createdBy: "60e12a125149fc3f3d9e8b1", // User ObjectId
          body: "This is retweet 1 for post 2",
        },
        {
          createdBy: "60e12a125149fc3f3d9e8b2", // User ObjectId
          body: "This is retweet 2 for post 2",
        },
      ],
    },
  ];
  return (
    <div className={styles.main}>
      <div className={styles.homeBar}>
        <h2>Home</h2>
        {/* <CogIcon className={styles.homeBarIcon} /> */}
      </div>
      {session && <PostBox setPosts={setPosts} />}
      {post.map((post) => {
        return <Post key={post._id} post={post} />;
      })}
    </div>
  );
}
