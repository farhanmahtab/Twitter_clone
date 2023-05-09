import React, { useEffect, useState } from "react";
import styles from "../styles/Widget.module.css";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { fetchUsers } from "@/actionFiles/FetchActions";
import Link from "next/link";
function Following({ user }) {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const [isFollowed, setIsFollowed] = useState(
    user.followers.includes(session.user.id)
  );
  const userID = session.user.id;
  //console.log(session.user.id);
  useEffect(() => {
    fetchUsers(userID, setUsers);
  }, []);
  //console.log(users);

  const handleFollow = async (userId) => {
    const res = await fetch(`/api/user/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentUserId: session.user.id,
      }),
    });

    const data = await res.json();
    //console.log(data);

    const updatedUsers = [...users];
    setIsFollowed(!isFollowed);
    setUsers(updatedUsers);
    //console.log("Following : " + isFollowed);
  };
  return (
    <div className={styles.followBox}>
      <img src={user.profilePicture} className={styles.followImg} />
      <div className={styles.followNameBox}>
        {/* <Link href={`/profile/${user._id}`}>
          <h4>{user.name}</h4>
        </Link> */}
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
