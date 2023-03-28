import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../styles/modal.module.css";
import { signIn } from "next-auth/react";

function SignUp() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    profilePicture: "",
    coverPhoto: "",
    bio: "",
    followers: [],
    following: [],
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(userData);
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    await signIn("credentials", {
      email: userData.email,
      password: userData.password,
      redirect: true,
      callbackUrl: `${window.location.origin}/`,
    });
  };
  const handleInputChange = (event) => {
    // console.log(event.target.value)
    userData[event.target.name] = event.target.value;
    setUserData(() => ({
      ...userData,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Create Your Account</h2>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Name"
        value={userData.name}
        onChange={(event) => handleInputChange(event)}
        className={styles.inputs}
      />
      <input
        type="text"
        id="username"
        name="username"
        placeholder="Username"
        value={userData.username}
        onChange={(event) => handleInputChange(event)}
        className={styles.inputs}
      />
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        value={userData.email}
        onChange={(event) => handleInputChange(event)}
        className={styles.inputs}
      />
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        value={userData.password}
        onChange={(event) => handleInputChange(event)}
        className={styles.inputs}
      />
      <button
        className={styles.submitButton}
        onClick={() => {
          router.replace("/");
        }}
      >
        Submit
      </button>
      <h4>
        Have an account already?{" "}
        <p
          className={styles.link}
          onClick={() => {
            router.replace("/?modal=login");
          }}
        >
          Log in
        </p>{" "}
        using your account
      </h4>
    </form>
  );
}

export default SignUp;
