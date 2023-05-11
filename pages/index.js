import Feed from "@/components/Feed";
import Modal from "@/components/Modal";
import Sidebar from "@/components/Sidebar";
import SignUp from "@/components/SignUp";
import LogIn from "@/components/LogIn";
import Widget from "@/components/Widget";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import EditPost from "./post/EditPost";
import Reply from "@/components/reply";
import { useEffect, useRef, useState } from "react";
import { set } from "mongoose";
import Comment from "@/components/Comment";
import Retweet from "@/components/Retweet";

export default function Home({ newsResults, comments, usersResults, posts }) {
  let router = useRouter();
  const [post, setPost] = useState([]);

  useEffect(() => {
    setPost(posts.posts);
  }, [posts]);
  //console.log(post);
  return (
    <>
      <Head>
        <title>twitter</title>
        <link rel="icon" href="/Twitter-logo.ico" type="image/icon type"></link>
      </Head>
      {router.query.modal == "signup" && (
        <Modal>
          <SignUp />
        </Modal>
      )}
      {router.query.modal == "login" && (
        <Modal>
          <LogIn />
        </Modal>
      )}
      {router.query.modal == "editPost" && (
        <Modal>
          <EditPost posts={post} setPosts={setPost} />
        </Modal>
      )}
      {router.query.modal == "reply" && (
        <Modal>
          <Reply post={posts} setPost={setPost} />
        </Modal>
      )}
      {router.query.modal == "comment" && (
        <Modal>
          <Comment posts={post} setPosts={setPost} />
        </Modal>
      )}
      {router.query.modal == "retweet" && (
        <Modal>
          <Retweet post={posts.posts} setPost={setPost} />
        </Modal>
      )}

      <main className={styles.main}>
        {/* sidebar */}
        <Sidebar />
        {/* feed */}
        <Feed posts={post} setPosts={setPost} />
        {/* widget */}
        <Widget
          newsResults={newsResults?.articles}
          users={usersResults?.users || null}
        />
      </main>
    </>
  );
}

export async function getServerSideProps({ context }) {
  // random news
  const newsResults = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
  ).then((res) => res.json());

  //Comments
  let comments = [];
  try {
    const res = await fetch("http://localhost:3000/api/post/comment");
    comments = await res.json();
  } catch (e) {
    comments = [];
  }
  //posts
  let posts = [];
  try {
    const res = await fetch(
      `http://localhost:3000/api/post`
      // `http://localhost:3000/api/post/posts?=page${page}`
    );
    posts = await res.json();
  } catch (e) {
    posts = [];
  }
  // follow Section
  let usersResults = [];
  try {
    const res = await fetch("http://localhost:3000/api/user");

    usersResults = await res.json();
  } catch (e) {
    usersResults = [];
  }

  return {
    props: {
      newsResults,
      comments,
      usersResults,
      posts,
    },
  };
}
