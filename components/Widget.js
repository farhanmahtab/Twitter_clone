import { SearchIcon } from "@heroicons/react/outline";
import React from "react";
import styles from "../styles/Widget.module.css";
import WidgetNews from "./WidgetNews";

const Widget = ({ newsResults, randomUsersResults }) => {
  // console.log(newsResults);
  return (
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
        {newsResults?.slice(0, 10).map((article) => (
          <WidgetNews key={article.title} article={article} />
        ))}
        <button className={styles.newsButton}>Show More</button>
      </div>
    </div>
  );
};

export default Widget;
