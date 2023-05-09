export const TweetActions = {
  postTweet: "POST_TWEET",
  patchTweet: "PATCH_TWEET",
  deleteTweet: "DELETE_TWEET",
  postRetweet: "POST_RETWEET",
  postLike: "POST_LIKE",
};

export const TweetReducer = (state, action) => {
  switch (action.type) {
    case TweetActions.postTweet:
      postTweet(action.payload);
      break;
    case TweetActions.patchTweet:
      patchTweet(action.payload);
      break;
    case TweetActions.deleteTweet:
      deleteTweet(action.payload);
      break;
    case TweetActions.postRetweet:
      postRetweet(action.payload);
      break;
    default:
      return state;
  }
};

export const TweetDispatch = (action) => {
  TweetReducer(null, action);
};

//functions

const postTweet = async ({ formData, setPosts, allPost }) => {
  const requestOptions = {
    method: "POST",
    body: formData,
  };
  try {
    const response = await fetch("/api/post/posts", requestOptions);
    const data = await response.json();
    console.log(data);
    setPosts([data.data, ...allPost]);
  } catch (error) {
    console.log(error);
  }
};
const patchTweet = async ({ id, formData, posts, setPosts }) => {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };
  try {
    const res = await fetch(`/api/post/posts?postId=${id}`, requestOptions);
    const data = await res.json();
    console.log(data);
    setPosts([data.data, ...posts]);
  } catch (error) {
    console.error(error);
  }
};
const deleteTweet = async ({ postId, posts, setPosts }) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId }),
  };
  try {
    const response = await fetch(`/api/post/posts`, requestOptions);
    if (response.ok) {
      console.log(postId, " is Deleted");
      const newPosts = posts.filter(
        (postIterable) => postIterable._id !== postId
      );
      setPosts(newPosts);
    } else {
      console.error(`Failed to delete post with ID ${postId}`);
    }
  } catch (error) {
    console.error(error);
  }
};

const postRetweet = async ({
  post,
  setPost,
  setTweet,
  userEmail,
  postId,
  tweet,
}) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userEmail,
      postId: postId,
      postBody: tweet,
    }),
  };
  try {
    const response = await fetch("api/post/retweet", requestOptions);
    const data = await response.json();
    console.log(data);
    setPost([data.data, ...post.post]);
    setTweet("");
  } catch (error) {
    console.error(error);
  }
};
