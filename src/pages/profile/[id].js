import Sidebar from "@/components/Sidebar";
import Widget from "@/components/Widget";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Style from "@/styles/Profile.module.css";
import { useSession } from "next-auth/react";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Edit from "./EditProfile";
import Modal from "@/components/Modal";
import {
  fetchUserById,
  fetchPostByUserID,
  fetchFollowing,
  fetchFollowers,
} from "@/actionFiles/FetchActions";

import connectMongo from "@/Utils/db";
import Posts from "@/models/Post";
import Post from "@/components/Post";
import Follow from "@/components/Follower";
import RetweetPost from "@/components/PostRetweet";

const profile = ({ newsResults, usersResults }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState();
  const [post, setPost] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [selectedOption, setSelectedOption] = useState("tweets");
  const router = useRouter();
  const pathCur = router.asPath;
  const userId = router.query.id;

  useEffect(() => {
    fetchUserById(userId, setUser);
    fetchPostByUserID(userId, setPost);
    fetchFollowing(userId, setFollowing);
    fetchFollowers(userId, setFollowers);
  }, [router.query]);

  return (
    <div>
      {router.query.modal == "edit" && (
        <Modal>
          <Edit user={user} setUser={setUser} />
        </Modal>
      )}
      <main className={Style.profileMain}>
        <Sidebar />
        <div className={Style.feed}>
          <div className={Style.homeBar}>
            <ArrowLeftIcon
              className={Style.homeBarIcon}
              onClick={() => router.push("/")}
            />
            <div>
              <h2>{user?.name}</h2>
              <p>{post.length} tweets</p>
            </div>
          </div>
          <div className={Style.coverPhotoDiv}>
            {/* <img alt="cover-photo" src={user?.coverPhoto} /> */}
            <Image
              height={300}
              width={550}
              alt="cover-photo"
              src={user?.coverPhoto}
              className={Style.coverImg}
            />
          </div>
          <div className={Style.profilePictureDiv}>
            <div className={Style.profilePicture}>
              <img src={user?.profilePicture} alt="proflie-picture" />{" "}
              <h4>{user?.bio}</h4>
              <h4>
                {user?.followers?.length} Followers {"   "}{" "}
                {user?.following?.length} Following
              </h4>
            </div>
            <div className={Style.profileInfo}>
              <h3>{user?.name}</h3>
              <h5>@{user?.username}</h5>
              {session && session.user.id === userId && (
                <button
                  className={Style.profileEditButton}
                  onClick={() =>
                    router.push({
                      pathname: pathCur,
                      query: {
                        modal: "edit",
                      },
                    })
                  }
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          <div className={Style.viewOptions}>
            <div
              className={`${Style.options} ${
                selectedOption === "tweets" ? Style.selected : ""
              }`}
              onClick={() => setSelectedOption("tweets")}
            >
              Tweets
            </div>
            <div
              className={`${Style.options} ${
                selectedOption === "followers" ? Style.selected : ""
              }`}
              onClick={() => setSelectedOption("followers")}
            >
              Followers
            </div>
            <div
              className={`${Style.options} ${
                selectedOption === "following" ? Style.selected : ""
              }`}
              onClick={() => setSelectedOption("following")}
            >
              Following
            </div>
          </div>

          {selectedOption === "tweets" &&
            post.map((post, index) => {
              if (post?.typeofTweet === "retweet") {
                return (
                  <RetweetPost
                    key={`${post?._id}-${index}`}
                    post={post}
                    setPosts={setPost}
                  />
                );
              } else {
                return (
                  <Post
                    key={`${post?._id}-${index}`}
                    post={post}
                    setPost={setPost}
                  />
                );
              }
            })}
          {selectedOption === "followers" &&
            followers.map((follow) => {
              return <Follow follow={follow} />;
            })}
          {selectedOption === "following" &&
            following.map((follow) => {
              return <Follow follow={follow} />;
            })}
        </div>

        <Widget
          newsResults={newsResults?.articles}
          users={usersResults?.users || null}
        />
      </main>
    </div>
  );
};

export default profile;

//get ServerSide props
export async function getServerSideProps(context) {
  const { userID } = context.query;
  await connectMongo();
  // random news
  const newsResults = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
  ).then((res) => res.json());
  //fetch post by user id

  // const userPosts = await fetch(`http://localhost:3000/api/user/${userId}`)
  // follow Section
  let usersResults = [];
  try {
    const res = await fetch("http://localhost:3000/api/user");

    usersResults = await res.json();
  } catch (e) {
    usersResults = [];
  }
  //get posts by userId
  let post = [];
  try {
    const Response = await fetch(`http://localhost:3000/api/user/${userID}`);
    const data = await Response.json();
    post = await Posts.find({ createdBy: userID })
      .sort({ createdAt: -1 })
      .populate({
        path: "createdBy",
        select: "name username email profilePicture",
      })
      .populate({
        path: "Comment",
        select: "body createdAt",
        populate: {
          path: "author",
          select: "name username email profilePicture",
        },
      });
  } catch (e) {
    data.Post = [];
  }

  return {
    props: {
      newsResults,
      usersResults,
    },
  };
}
