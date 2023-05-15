import React, { useEffect, useState } from "react";
import styles from "@/styles/Widget.module.css";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { fetchUsers } from "@/actionFiles/FetchActions";
import { UserActions, UserDispatch } from "@/actionFiles/user";

function Following({ user }) {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [followData, setfollowData] = useState([]);
  const router = useRouter();
  const [isFollowed, setIsFollowed] = useState(
    user.followers.includes(session.user.id)
  );
  const currentUserId = session.user.id;
  useEffect(() => {
    fetchUsers(currentUserId, setUsers);
  }, []);

  const handleFollow = async (userId) => {
    UserDispatch({
      type: UserActions.unfollowUser,
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
  };
  return (
    <div className={styles.followBox}>
      <img src={user.profilePicture} className={styles.followImg} />
      <div className={styles.followNameBox}>
        <h4 onClick={() => router.replace(`/profile/${user._id}`)}>
          {user.name}
        </h4>

        <p>{user.username}</p>
      </div>
      <button
        className={styles.followButton}
        onClick={() => {
          handleFollow(user._id);
        }}
      >
        {isFollowed ? <p>Unfollow</p> : <p>follow</p>}
      </button>
    </div>
  );
}

export default Following;
