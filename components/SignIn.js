import Link from "next/link";
import React from "react";
import styles from "../styles/SignIn.module.css";

export default function SignIn() {
  return (
    <div className={styles.main}>
      <div className={styles.SignInBox}>
        <h3>New To Twitter ?</h3>
        <p>Sign up now to get your own personalized timeline!</p>
        <div className={styles.buttonDiv}>
          <div className={styles.button}>
            <Link href="#">Sign In</Link>
          </div>
          <div className={styles.button}>
            <Link href="http://localhost:3000/api/auth/signin">
              Sign UP With GitHub
            </Link>
          </div>
          <div className={styles.button}>
            <Link href="#">Create account</Link>
          </div>
        </div>
        <p>
          By signing up, you agree to the Terms of Service and Privacy Policy,
          including Cookie Use.
        </p>
      </div>
      <div className={styles.extra}>
        <p>
          Terms of Service Privacy Policy Cookie Policy Accessibility Ads info
          More
        </p>
        <p>© 2023 Twitter, Inc.</p>
      </div>
    </div>
  );
}
