import React, { useState } from "react";
import Style from "./editProfile.module.css";
import { useRouter } from "next/router";

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
    console.log(user._id);
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
      console.log(data.message);
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
    <div>
      <form onSubmit={handleSubmit} className={Style.main}>
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
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
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
        <button type="submit" onClick={()=>router.push(`/profile/${user._id}`)}>Save Changes</button>
      </form>
    </div>
  );
};

export default Edit;
{
  /* <form action="/user/edit" method="POST">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" value="{{ user?.name }}" required>
  
  <label for="username">Username:</label>
  <input type="text" id="username" name="username" value="{{ user.username }}" required>
  
  <label for="profilePicture">Profile Picture:</label>
  <input type="text" id="profilePicture" name="profilePicture" value="{{ user.profilePicture }}" required>
  
  <label for="coverPhoto">Cover Photo:</label>
  <input type="text" id="coverPhoto" name="coverPhoto" value="{{ user.coverPhoto }}" required>
  
  <label for="bio">Bio:</label>
  <textarea id="bio" name="bio" required>{{ user.bio }}</textarea>
  
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" value="{{ user.email }}" required>
  
  <label for="password">Password:</label>
  <input type="password" id="password" name="password" required>
  
  <button type="submit">Save Changes</button>
</form> */
}
