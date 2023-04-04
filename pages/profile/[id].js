import Sidebar from "@/components/Sidebar";
import Widget from "@/components/Widget";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Style from "../../styles/Profile.module.css";
import { useSession } from "next-auth/react";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Edit from "./EditProfile";
import Modal from "@/components/Modal";

const profile = ({ newsResults, usersResults }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState();
  const router = useRouter();
  const pathCur = router.asPath;
  const userId = router.query.id;
  //console.log(userId);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/user/${userId}`);
      const data = await res.json();
      setUser(data.user);
    };
    fetchUser();
  });
  //console.log(user);
  return (
    <div>
      {router.query.modal == "edit" && (
        <Modal>
          <Edit user={user} />
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
            <h2>{user?.name}</h2>
            {/* <p>{userId}</p> */}
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
          <div className={Style.profilePicture}>
            <div>
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
export async function getServerSideProps() {
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

  return {
    props: {
      newsResults,
      usersResults,
    },
  };
}
