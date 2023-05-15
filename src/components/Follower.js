import React, { useState } from "react";
import styles from "@/styles/Widget.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { UserActions, UserDispatch } from "@/actionFiles/user";

const Follow = ({ follow }) => {
  const user = follow;
  const { data: session } = useSession();
  const [followData, setfollowData] = useState([]);
  const router = useRouter();
  const currentUserId = session.user.id;
  const [isFollowed, setIsFollowed] = useState(
    follow.followers.includes(session.user.id)
  );

  const handleFollow = async (userId) => {
    UserDispatch({
      type: UserActions.followUser,
      payload: {
        userId,
        currentUserId,
        isFollowed,
        setIsFollowed,
        followData,
        setfollowData,
      },
    });
    console.log(isFollowed);
    // const res = await fetch(`/api/user/${userId}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     currentUserId: currentUserId,
    //   }),
    // });
    // const updatedUsers = [...followData];
    // setIsFollowed(!isFollowed);
    // setfollowData(updatedUsers);
  };
  return (
    <div>
      {" "}
      <div className={styles.followBox}>
        <img src={user?.profilePicture} className={styles.followImg} />
        <div className={styles.followNameBox}>
          <h4 onClick={() => router.push(`/profile/${follow._id}`)}>
            {follow?.name}
          </h4>
          <p>@{follow?.username}</p>
        </div>
        <button
          className={styles.followButton}
          onClick={() => {
            handleFollow(follow?._id);
          }}
        >
          {isFollowed ? <p>Unfollow</p> : <p>follow</p>}
        </button>
      </div>
    </div>
  );
};

export default Follow;
