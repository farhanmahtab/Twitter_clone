import React from "react";
import styles from "@/styles/WidgetNews.module.css";

export default function News({ article }) {
  return (
    <a
      rel="noreferrer"
      href={article.url}
      target="_blank"
      className={styles.anchor}
    >
      <div className={styles.main}>
        <div className={styles.newsContainer}>
          <h6>{article.title}</h6>
          <p>{article.source.name}</p>
        </div>
        <img src={article.urlToImage} alt="post Image" className={styles.img} />
      </div>
    </a>
  );
}
