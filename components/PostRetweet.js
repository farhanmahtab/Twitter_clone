import {
  ChartSquareBarIcon,
  ChatIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
  PencilAltIcon,
} from "@heroicons/react/outline";
import { FaRetweet } from "react-icons/fa";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/Post.module.css";
import { useSession } from "next-auth/react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/router";
import PostComment from "./PostComment";
import RetweetBox from "./RetweetBox";
import { TweetActions, TweetDispatch } from "@/actionFiles/posts";
import { fecthPostByPostId, fetchComment } from "@/actionFiles/FetchActions";

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
  const postId = post.originalTweetId;

  useEffect(() => {
    fetchComment(post?._id, setComment);
    fecthPostByPostId(postId, setTweet);
  }, []);

  //console.log(comment);
  const handleDelete = async () => {
    const postId = post?._id;
    TweetDispatch({
      type: TweetActions.deleteTweet,
      payload: {
        postId,
        posts,
        setPosts,
      },
    });
    router.replace("/");
  };

  //handle Like
  const handleReact = async () => {
    const postId = post._id;
    const userId = session.user.id;
    TweetDispatch({
      type: TweetActions.postLike,
      payload: {
        postId,
        userId,
        reactNumber,
        setReactNumber,
        setIsLiked,
      },
    });
  };

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
            <FaRetweet className={styles.retweetIcon}/>
            <span>retweeted</span>
            <div className={styles.dot}></div>
            <span>{formatTime} ago</span>
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
            <h4>{Math.max(reactNumber, 0)}</h4>
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
            <h4>201</h4>
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
