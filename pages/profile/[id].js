import Sidebar from "@/components/Sidebar";
import Widget from "@/components/Widget";
import { useRouter } from "next/router";
import React from "react";
import Style from "../../styles/Profile.module.css";
import StyleTop from "../../styles/Feed.module.css";
import { useSession } from "next-auth/react";
import { ArrowLeftIcon } from "@heroicons/react/outline";

const profile = ({ newsResults, randomUsersResults }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const postId = router.query.id;
  //console.log(session?.user.name);

  return (
    <div>
      <main className={Style.profileMain}>
        <Sidebar />
        <div className={Style.feed}>
          <div className={Style.homeBar}>
            <ArrowLeftIcon className={Style.homeBarIcon} />
            <h2>{session?.user.name}</h2>
          </div>

        </div>

        <Widget
          newsResults={newsResults?.articles}
          randomUsersResults={randomUsersResults?.results || null}
        />
      </main>
    </div>
  );
};

export default profile;

//get ServerSide props
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
