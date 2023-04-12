import {
  ChartSquareBarIcon,
  ChatIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
  PencilAltIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/Post.module.css";
import { useSession } from "next-auth/react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/router";
import PostComment from "./PostComment";
import RetweetBox from "./RetweetBox";

const RetweetPost = ({ post, posts, setPosts }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathCur = router.asPath;
  const [reactNumber, setReactNumber] = useState(post.react.length);
  const [isLiked, setIsLiked] = useState(
    post?.react?.includes(session?.user?.id)
  );
  const [tweet, setTweet] = useState();

  const [comment, setComment] = useState([]);
  const formatTime = formatDistanceToNow(new Date(post?.createdAt));

  const fetchtweet = async () => {
    const res = await fetch(`/api/post/${post.originalTweetId}`);
    const data = await res.json();
    setTweet(data.post);
  };
  //console.log(tweet);
  const fetchComment = async () => {
    const res = await fetch(`/api/post/comments?postId=${post._id}`);
    const data = await res.json();
    //console.log(data.comments);
    setComment(data.comments);
  };
  useEffect(() => {
    fetchComment();
    fetchtweet();
  }, []);

  //console.log(comment);
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

  //handle Like
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

  //handle retweet
  const handleRetweet = async () => {
    console.log(post._id);
  };
  //console.log(post.comments);

  return (
    <div className={styles.postMain}>
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
            <span>retweeted</span>
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
        <div className={styles.textBody}>
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
        <RetweetBox post={tweet} />
        {/* Icons */}
        <div className={styles.iconsBottom}>
          <div className={styles.iconDiv}>
            <ChatIcon
              className={styles.icon}
              onClick={() =>
                router.push({
                  pathname: pathCur,
                  query: {
                    modal: `comment`,
                    postId: post._id,
                  },
                })
              }
            />
            <h4>{post.comments.length}</h4>
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
            <ShareIcon
              className={styles.icon}
              onClick={() =>
                router.push({
                  pathname: pathCur,
                  query: {
                    modal: `retweet`,
                    postId: post._id,
                  },
                })
              }
            />
            <h4>{post.NumberOfRetweet}</h4>
          </div>
          <div className={styles.iconDiv}>
            <ChartSquareBarIcon className={styles.icon} />
            <h4>200</h4>
          </div>
        </div>
        {/* Comment */}
        {comment.map((comment) => {
          return (
            <PostComment
              key={comment._id}
              comment={comment}
              postId={post._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RetweetPost;
