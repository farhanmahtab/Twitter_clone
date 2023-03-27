import { useRouter } from "next/router";
import React from "react";
import styles from "../styles/modal.module.css";

function LogIn() {
  const router = useRouter();
  return (
    <div className={styles.form}>
      <h2>Sign In to twitter</h2>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        className={styles.inputs}
      />
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        className={styles.inputs}
      />
      <button className={styles.submitButton}>Submit</button>
      <p>
        Dont't have an account ?
        <h4
          className={styles.link}
          onClick={() => {
            router.replace("/?modal=signup");
          }}
        >
          {" "}
          Sign up
        </h4>
      </p>
    </div>
  );
}

export default LogIn;
