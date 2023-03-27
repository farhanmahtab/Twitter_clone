import { useRouter } from "next/router";
import React from "react";
import styles from "../styles/modal.module.css";

function SignUp() {
  const router = useRouter()
  return (
    <div className={styles.form}>
      <h2>Create Your Account</h2>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Name"
        className={styles.inputs}
      />
      <input
        type="text"
        id="username"
        name="username"
        placeholder="Username"
        className={styles.inputs}
      />
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
        Have an account already? <h4 className={styles.link} onClick={() => {
             router.replace("/?modal=login");
          }}>
        Log in</h4> using
        your account
      </p>
    </div>
  );
}

export default SignUp;
{/* <div className={styles.link}></div>  */}