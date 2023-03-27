import { SearchIcon } from "@heroicons/react/outline";
import { useSession  } from "next-auth/react";
import React, { useState } from "react";
import styles from "../styles/Widget.module.css";
import Following from "./Following";
import SignIn from "./SignIn";
import WidgetNews from "./WidgetNews";

const Widget = ({ newsResults, randomUsersResults }) => {
  // console.log(newsResults);
  const [articleNum, setArticleNum] = useState(3);
  const [followNum, setFollowNum] = useState(3);
  const {data : session } = useSession()
  return (
    <>
      {!session ? (
        <SignIn />
      ) : (
        <>
          <div className={styles.widgetMain}>
            <div className={styles.searchBarDiv}>
              <div className={styles.searchBar}>
                <SearchIcon className={styles.icon} />
                <input
                  className={styles.searchArea}
                  type="text"
                  placeholder="Search Twitter"
                ></input>
              </div>
            </div>
            <div className={styles.news}>
              <h4>Whats Happening</h4>
              {newsResults?.slice(0, articleNum).map((article) => (
                <WidgetNews key={article.title} article={article} />
              ))}
              <button
                className={styles.newsButton}
                onClick={() => setArticleNum(articleNum + 3)}
              >
                Show More
              </button>
            </div>
            <div className={styles.follow}>
              <h4>Who to follow</h4>
              {randomUsersResults?.slice(0, followNum).map((user) => (
                <>
                  <Following key={user.login.username} user={user} />
                </>
              ))}
              <button
                className={styles.newsButton}
                onClick={() => setFollowNum(followNum + 3)}
              >
                Show More
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Widget;
