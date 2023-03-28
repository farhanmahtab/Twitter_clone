import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../styles/modal.module.css";
import { signIn } from "next-auth/react";
import { useSession  } from "next-auth/react";

function LogIn() {
  const router = useRouter();
  const {data : session } = useSession();
  console.log(session?.user)
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleLogIn =async (event) => {
    event.preventDefault();
    console.log(userData);
    await signIn("credentials", {
      email: userData.email,
      password: userData.password,
      redirect: true,
      callbackUrl: `${window.location.origin}/`
    });
  };
  const handleChange = (event) => {
    setUserData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={handleLogIn} className={styles.form}>
      <h2>Sign In to twitter</h2>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        value={userData.name}
        onChange={handleChange}
        className={styles.inputs}
      />
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        value={userData.password}
        onChange={handleChange}
        className={styles.inputs}
      />
      <button className={styles.submitButton}>
        Submit
      </button>
      <h4>
        Dont't have an account ?
        <p
          className={styles.link}
          onClick={() => {
            router.replace("/?modal=signup");
          }}
        >
          {" "}
          Sign up
        </p>
      </h4>
    </form>
  );
}

export default LogIn;
