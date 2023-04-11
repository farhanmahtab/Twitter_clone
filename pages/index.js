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
import { useEffect, useState } from "react";
import { set } from "mongoose";
import Comment from "@/components/Comment";

export default function Home({ newsResults, comments, usersResults, posts }) {
  let router = useRouter();
  const [post, setPost] = useState([]);
  useEffect(() => {
    setPost(posts);
  }, []);
  //console.log(posts.posts);
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
          <EditPost />
        </Modal>
      )}
      {router.query.modal == "reply" && (
        <Modal>
          <Reply post={post} setPost={setPost} />
        </Modal>
      )}
      {router.query.modal == "comment" && (
        <Modal>
          <Comment />
        </Modal>
      )}

      <main className={styles.main}>
        {/* sidebar */}
        <Sidebar />
        {/* feed */}
        <Feed post={posts.posts} />
        {/* widget */}
        <Widget
          newsResults={newsResults?.articles}
          users={usersResults?.users || null}
        />
      </main>
    </>
  );
}
// randomUsersResults={randomUsersResults?.results || null}
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
    const res = await fetch("http://localhost:3000/api/post/posts");
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
