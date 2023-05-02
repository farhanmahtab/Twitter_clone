import React, { useContext, useState } from "react";

import styles from "../signInDiv/ModalSignInDiv.module.css";
import TwitterLogo from "@/components/common/svg/TwitterLogo";
import Or from "@/components/common/Or";

import Loader from "@/components/common/loader/Loader";
import Link from "next/link";

import { useRouter } from "next/router";
import { MODAL_QUERY_SIGNIN } from "@/helper/constStrings";
import { signIn, useSession } from "next-auth/react";

export default function EditProfile() {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [bio, setBio] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState();

  const [selectedImage2, setSelectedImage2] = useState("");
  const [selectedFile2, setSelectedFile2] = useState();

  return (
    <div className={`${styles.signUpDiv} ${styles.showSignIn}`}>
      <TwitterLogo></TwitterLogo>
      <h1>Edit Profile</h1>
      <form
        onSubmit={async (e) => {
          setLoading(true);
          e.preventDefault();

          const data = {
            _id: session.data.user.id,
          };
          if (userName != "") {
            data.username = userName;
          }
          if (image != "") {
            data.image = image;
          }
          if (bio != "") {
            data.bio = bio;
          }
          if (coverImage != "") {
            data.coverImage = coverImage;
          }

          try {
            const formData = new FormData();
            formData.append("_id", session.data.user.id);
            if (userName != "") {
              formData.append("username", userName);
            }
            if (selectedFile) {
              formData.append("image", selectedFile);
            }
            if (selectedFile2) {
              formData.append("coverImage", selectedFile2);
            }
            if (bio != "") {
              formData.append("bio", bio);
            }

            const response = await fetch("/api/v2/users/", {
              method: "PATCH",
              // headers: {
              //   "Content-Type": "application/json",
              // },
              // body: JSON.stringify(data),
              body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
              throw new Error(result.msg);
            }

            setError(result.error);
            if (!result.error) {
              // router.reload();
              await signIn("credentials", {
                callbackUrl: "/profile?id=" + router.query.id,
              });
              router.replace({
                pathname: "/profile",

                query: { id: session.data.user.id },
              });
            }
          } catch (error) {
            setError(error.message);
          }

          setLoading(false);
        }}
        action=""
      >
        <div className={styles["input-group"]}>
          <input
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
            type="text"
            name="name"
            className={styles["input"]}
          />
          <label className={styles["user-label"]}>Username</label>
        </div>

        {/* <div className={styles["input-group"]}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Hola"
            required
            type="email"
            name="email"
            className={styles["input"]}
          />
          <label className={styles["user-label"]}>Email</label>
        </div>
        <div className={styles["input-group"]}>
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Hola"
            required
            type="password"
            autoComplete="false"
            name="password"
            className={styles["input"]}
          />
          <label className={styles["user-label"]}>Password</label>
        </div> */}
        <div className={styles["input-group"]}>
          <input
            onChange={(e) => setBio(e.target.value)}
            placeholder="Hola"
            type="text"
            autoComplete="false"
            name="bio"
            className={styles["input"]}
          />
          <label className={styles["user-label"]}>Bio</label>
        </div>

        <div>
          <label htmlFor="img-upload">
            <input
              accept="image/*"
              id="img-upload"
              hidden
              type="file"
              onChange={({ target }) => {
                if (target.files) {
                  const file = target.files[0];
                  setSelectedImage(URL.createObjectURL(file));
                  setSelectedFile(file);
                }
              }}
            />
            <div>
              {selectedImage ? (
                <>
                  <p>Profile Image</p>
                  <img
                    className={styles.uploadPic}
                    src={selectedImage}
                    alt=""
                  />
                </>
              ) : (
                <div className="label">
                  <svg
                    width={"20px"}
                    className={styles.picSVG}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <g>
                      <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                    </g>
                  </svg>
                  <p>Profile Image</p>
                </div>
              )}
            </div>
          </label>
        </div>
        <div>
          <label htmlFor="img-upload2">
            <input
              accept="image/*"
              id="img-upload2"
              hidden
              type="file"
              onChange={({ target }) => {
                if (target.files) {
                  const file = target.files[0];
                  setSelectedImage2(URL.createObjectURL(file));
                  setSelectedFile2(file);
                }
              }}
            />
            <div>
              {selectedImage2 ? (
                <>
                  <p>Cover Photo</p>
                  <img
                    className={styles.uploadPic}
                    src={selectedImage2}
                    alt=""
                  />
                </>
              ) : (
                <div className="label">
                  <svg
                    width={"20px"}
                    className={styles.picSVG}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <g>
                      <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                    </g>
                  </svg>
                  <p>Cover Photo</p>
                </div>
              )}
            </div>
          </label>
        </div>
        {error && (
          <p className={styles.error} style={{ color: "red" }}>
            {error}
          </p>
        )}

        {loading ? (
          <Loader />
        ) : (
          <input
            className="btn-primary"
            type="submit"
            value="Edit Profile"
            style={{
              paddingBlock: ".5rem",
              backgroundColor: "black",
            }}
          />
        )}
      </form>
      {/* <p>By signing up, you agree to the <span>Terms of Service</span> and <span>Privacy Policy</span>, including <span>Cookie Use</span>.</p> */}
      <style jsx>{`
        .label {
          display: flex;
          justify-content: start;
          align-items: center;
           {
            /* width: 40%; */
          }
        }
      `}</style>
    </div>
  );
}

// <div className={styles["input-group"]}>
// <input
//   onChange={(e) => setImage(e.target.value)}
//   placeholder="Hola"
//   type="text"
//   autoComplete="false"
//   name="image"
//   className={styles["input"]}
// />
// <label className={styles["user-label"]}>Image link</label>
// </div>
// <div className={styles["input-group"]}>
// <input
//   onChange={(e) => setCoverImage(e.target.value)}
//   placeholder="Hola"
//   type="text"
//   autoComplete="false"
//   name="coverImage"
//   className={styles["input"]}
// />
// <label className={styles["user-label"]}>Cover Image link</label>
// </div>
