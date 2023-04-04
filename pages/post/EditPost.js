import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Styles from "./editPost.module.css";

const EditPost = ({ post }) => {
  //console.log(post);
  const router = useRouter();
  const [formData, setFormData] = useState({
    body: post?.body,
    PostImage: post?.PostImage,
  });
  const handleSubmit = async (e) => {
    // console.log(user._id);
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/${post._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
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
    <div>
      <form className={Styles.form} onSubmit={handleSubmit}>
        <label>
          <textarea
            name="body"
            value={formData.body}
            placeholder="Update your post"
            onChange={handleChange}
          ></textarea>
        </label>

        <label>
          Post Image:
          <input
            type="text"
            name="PostImage"
            placeholder="Upload your image"
            value={formData.PostImage}
            onChange={handleChange}
          />
        </label>

        <button type="submit" onClick={() => router.push(`/post/${post._id}`)}>
          Tweet
        </button>
      </form>
    </div>
  );
};

export default EditPost;
