import React, { useState } from "react";
import Style from "./editProfile.module.css";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const Edit = ({ user }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: user?.name,
    username: user?.username,
    email: user?.email,
    password: "",
    bio: user?.bio,
    profilePicture: user?.profilePicture,
    coverPhoto: user?.coverPhoto,
  });

  const handleSubmit = async (e) => {
    // console.log(user._id);
    e.preventDefault();
    try {
      const res = await fetch(`/api/user/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.message === "success") {
        await signIn("credentials",{redirect:false});
      }
      //console.log(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className={Style.main}>
      <h2>update your profile</h2>
      <form onSubmit={handleSubmit} className={Style.form}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            placeholder={user?.name}
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            placeholder={user?.email}
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Bio:
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          ></textarea>
        </label>
        <label>
          Profile Picture:
          <input
            type="text"
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleChange}
          />
        </label>
        <label>
          Cover Photo:
          <input
            type="text"
            name="coverPhoto"
            value={formData.coverPhoto}
            onChange={handleChange}
          />
        </label>
        <button
          type="submit"
          onClick={() => router.push(`/profile/${user._id}`)}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Edit;
