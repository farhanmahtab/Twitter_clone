import Post from "@/components/Post";
import Sidebar from "@/components/Sidebar";
import Widget from "@/components/Widget";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Style from "../../styles/singlePost.module.css";
import styles from "../../styles/Post.module.css";
import { formatDistanceToNow } from "date-fns";
import {
  ChartSquareBarIcon,
  ChatIcon,
  CogIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import PostComment from "@/components/PostComment";
import EditPost from "./EditPost";
import Modal from "@/components/Modal";

function postPage({ newsResults, usersResults }) {
  const router = useRouter();
  const pathCur = router.asPath;
  //console.log(pathCur)
  const postId = router.query.id;
  //console.log(postId);
  const [post, setPost] = useState();
  const [formatTime, setFormatTime] = useState();
  const fetchPost = async () => {
    const res = await fetch(`/api/post//${postId}`);
    const data = await res.json();
    setPost(data.post);
    setFormatTime(formatDistanceToNow(new Date(data.post.createdAt)));
    //console.log(data.post.createdAt);
  };
  useEffect(() => {
    fetchPost();
  }, []);
  //console.log(post?.createdBy?.profilePicture);
  return (
    <div>
      {router.query.modal == "editPost" && (
        <Modal>
          <EditPost post={post} />
        </Modal>
      )}
      <Sidebar />
      <main className={Style.main}>
        <div className={Style.feed}>
          <div className={styles.postMain}>
            <Image
              src={post?.createdBy?.profilePicture}
              width="50"
              height="50"
              className={styles.profileImage}
              alt="user image"
            />
            <div className={styles.RightDiv}>
              {/* Username and Handle */}
              <div className={styles.rightBar}>
                <div className={styles.nameBar}>
                  <h4>{post?.createdBy?.name}</h4>
                  <span>{post?.createdBy?.username}</span>
                  <div className={styles.dot}></div>
                  <span>{formatTime}</span>
                </div>
                {/* dot icon */}               
                <CogIcon
                  className={styles.icon}
                  onClick={() =>
                    router.push({
                      pathname: pathCur,
                      query: {
                        modal: "editPost",
                      },
                    })
                  }
                />
              </div>
              <p>{post?.body}</p>
              {post?.img && (
                <img
                  src={post?.PostImage}
                  alt="post Image"
                  className={styles.postImage}
                />
              )}

              {/* Icons */}
              <div className={styles.iconsBottom}>
                <div className={styles.iconDiv}>
                  <ChatIcon
                    className={styles.icon}
                    onClick={() => {
                      router.replace(`?modal=comment&postId=${post._id}`);
                    }}
                  />
                  <h4>{post?.Comment?.length}</h4>
                </div>
                <div className={styles.iconDiv}>
                  <TrashIcon className={styles.icon} />
                </div>
                <div className={styles.iconDiv}>
                  <HeartIcon className={styles.icon} />
                  <h4>{post?.NumberOfReact}</h4>
                </div>
                <div className={styles.iconDiv}>
                  <ShareIcon className={styles.icon} />
                  <h4>20</h4>
                </div>
                <div className={styles.iconDiv}>
                  <ChartSquareBarIcon className={styles.icon} />
                  <h4>200</h4>
                </div>
              </div>
              {/* Comment */}
              {post?.Comment?.map((comment) => {
                return <PostComment key={comment._id} comment={comment} />;
              })}
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
}

export default postPage;

//get ServerSide props
export async function getServerSideProps() {
  // random news
  const newsResults = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
  ).then((res) => res.json());
  ////posts
  let posts = [];
  try {
    const res = await fetch("http://localhost:3000/api/post");
    posts = await res.json();
  } catch (e) {
    posts = [];
  }
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
      posts,
    },
  };
}
