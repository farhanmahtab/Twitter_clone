import Feed from "@/components/Feed";
import Modal from "@/components/Modal";
import Sidebar from "@/components/Sidebar";
import SignUp from "@/components/SignUp";
import LogIn from "@/components/LogIn";
import Comment from "@/components/Comment";
import Widget from "@/components/Widget";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

export default function Home({ newsResults, randomUsersResults }) {
  let router = useRouter();
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
      {router.query.modal == "comment" && (
        <Modal>
          <Comment/>
        </Modal>
      )}
      <main className={styles.main}>
        {/* sidebar */}
        <Sidebar />
        {/* feed */}
        <Feed />
        {/* widget */}
        <Widget
          newsResults={newsResults?.articles}
          randomUsersResults={randomUsersResults?.results || null}
        />
        {/* modal */}
      </main>
    </>
  );
}
// randomUsersResults={randomUsersResults?.results || null}
export async function getServerSideProps() {
  // random news
  const newsResults = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
  ).then((res) => res.json());

  // follow Section

  let randomUsersResults = [];

  try {
    const res = await fetch(
      "https://randomuser.me/api/?results=30&inc=name,login,picture"
    );

    randomUsersResults = await res.json();
  } catch (e) {
    randomUsersResults = [];
  }

  return {
    props: {
      newsResults,
      randomUsersResults,
    },
  };
}
