import {
  ChartSquareBarIcon,
  ChatIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
  PencilAltIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/Post.module.css";
import { useSession } from "next-auth/react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/router";
import Modal from "./Modal";
import EditPost from "@/pages/post/EditPost";

function Post({ post, posts, setPosts }) {
  const { data: session } = useSession();
  const router = useRouter();
  const pathCur = router.asPath;
  const [reactNumber, setReactNumber] = useState(post?.react?.length);
  const [isLiked, setIsLiked] = useState(
    post?.react?.includes(session?.user?.id)
  );
  const formatTime = formatDistanceToNow(new Date(post?.createdAt));

  //console.log(session.user.id);
  const handleDelete = async () => {
    const postId = post._id;
    try {
      const response = await fetch(`/api/post/posts`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });

      if (response.ok) {
        console.log(post._id, " is Deleted");

        const newPosts = posts.filter(
          (postIterable) => postIterable._id !== post._id
        );
        setPosts(newPosts);
      } else {
        console.error(`Failed to delete post with ID ${post._id}`);
      }
    } catch (error) {
      console.error(error);
    }
    router.replace("/");
  };
  const handleReact = async () => {
    const postId = post._id;
    const userId = session.user.id;
    try {
      const response = await fetch(`/api/post/react?postId=${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const { success, message } = await response.json();

      if (success) {
        console.log(message);
      } else {
        console.error(message);
      }
      message === "liked"
        ? (setReactNumber(reactNumber + 1), setIsLiked(true))
        : (setReactNumber(reactNumber - 1), setIsLiked(false));
    } catch (error) {
      console.error(error.message);
    }
  };
  //console.log(post.Comment.length);
  return (
    <div className={styles.postMain}>
      {router.query.modal == "editPost" && (
        <Modal>
          <EditPost />
        </Modal>
      )}
      <Image
        src={post.createdBy.profilePicture}
        width="50"
        height="50"
        className={styles.profileImage}
        alt="user image"
      />

      <div className={styles.RightDiv}>
        {/* Username and Handle */}
        <div className={styles.rightBar}>
          <div className={styles.nameBar}>
            <h4 onClick={() => router.push(`/profile/${post.createdBy._id}`)}>
              {post.createdBy.name}
            </h4>
            <span>{post.createdBy.username}</span>
            <div className={styles.dot}></div>
            <span>{formatTime}</span>
          </div>
          {session && session?.user.id === post?.createdBy._id && (
            <PencilAltIcon
              className={styles.icon}
              onClick={() =>
                router.push(
                  {
                    pathname: pathCur,
                    query: {
                      modal: `editPost`,
                      postId: post._id,
                    },
                  },
                  console.log(post._id)
                )
              }
            />
          )}

          {/* dot icon */}
        </div>
        {/* <Link href={`/post/${post._id}`}> */}
        <div
          className={styles.textBody}
          onClick={() => router.push(`/post/${post._id}`)}
        >
          <p>{post.body}</p>
        </div>

        {post.PostImage && (
          <Image
            src={`/images/${post.PostImage}`}
            width={400}
            height={350}
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
            <h4>post.Comments.length</h4>
          </div>

          <div className={styles.iconDiv}>
            {!isLiked ? (
              <HeartIcon
                className={styles.icon}
                onClick={() => handleReact()}
              />
            ) : (
              <HeartIconFilled
                className={styles.icon}
                onClick={() => handleReact()}
              />
            )}
            <h4>{reactNumber}</h4>
          </div>

          {session && session?.user.id === post?.createdBy._id && (
            <div className={styles.iconDiv}>
              <TrashIcon
                className={styles.icon}
                onClick={() => handleDelete()}
              />
            </div>
          )}

          <div className={styles.iconDiv}>
            <ShareIcon className={styles.icon} />
            <h4>20</h4>
          </div>
          <div className={styles.iconDiv}>
            <ChartSquareBarIcon className={styles.icon} />
            <h4>200</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
