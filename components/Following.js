import React from "react";
import styles from "../styles/Widget.module.css";
function Following({ user }) {
  return (
    <div className={styles.followBox}>
      <img src={user.picture.thumbnail} className={styles.followImg} />
      <div className={styles.followNameBox}>
        <h4>
          {user.name.first + " " + user.name.last}
        </h4>
        <p>{user.login.username}</p>
      </div>
      <button className={styles.followButton}>Follow</button>
    </div>
  );
}

export default Following;
