export const CommentActions = {
  //   getComment: "GET_COMMENT",
  postComment: "POST_COMMENT",
};

export const CommentReducer = (state, action) => {
  switch (action.type) {
    case CommentActions.postComment:
      postComment(action.payload);
      break;
    default:
      return state;
  }
};

export const CommentDispatch = (action) => {
  CommentReducer(null, action);
};

const postComment = async ({
  email,
  postId,
  comment,
  setComment,
  posts,
  setPosts,
}) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      postId: postId,
      body: comment,
    }),
  };
  try {
    console.log(postId);
    const response = await fetch("/api/post/comments", requestOptions);
    const data = await response.json();
    console.log(data);
    setComment("");
    setPosts([data.data, ...posts]);
  } catch (error) {
    console.log(error);
  }
};
