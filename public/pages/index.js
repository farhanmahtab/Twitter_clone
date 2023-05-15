import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widget from "@/components/Widget";
import Head from "next/head";
import styles from "@/styles/Home.module.css";

export default function Home({newsResults}) {
  return (
    <>
      <Head>
        <title>twitter</title>
        <link rel="icon" href="/Twitter-logo.ico" type="image/icon type"></link>
      </Head>
      <main className={styles.main}>
        {/* sidebar */}
        <Sidebar />
        {/* feed */}
        <Feed />
        {/* widget */}
        <Widget newsResults={newsResults?.articles}/>
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
