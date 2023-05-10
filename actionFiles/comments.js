export const CommentActions = {
  //   getComment: "GET_COMMENT",
  postComment: "POST_COMMENT",
  CommentReply: "COMMENT_REPLY",
};

export const CommentReducer = (state, action) => {
  switch (action.type) {
    case CommentActions.postComment:
      postComment(action.payload);
      break;
    case CommentActions.CommentReply:
      CommentReply(action.payload);
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
  post,
  setPost,
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
    setPost([data.data, ...post]);
  } catch (error) {
    console.log(error);
  }
};

const CommentReply = async ({
  email,
  postId,
  commentId,
  comment,
  setComment,
  post,
  setPost,
}) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      postId: postId,
      commentId: commentId,
      body: comment,
    }),
  };
  try {
    const response = await fetch("/api/post/comments/reply", requestOptions);
    const data = await response.json();
    console.log(data);
    setComment("");
    //setPost([data.data, ...post]);
  } catch (error) {
    console.error(error);
  }
};

// Update the post in the posts array
//  const updatedPosts = post.map((p) => {
//   if (p._id === postId) {
//     const updatedComments = p.comments.map((c) => {
//       if (c._id === commentId) {
//         return { ...c, replies: [data.data, ...c.replies] };
//       } else {
//         return c;
//       }
//     });
//     return { ...p, comments: updatedComments };
//   } else {
//     return p;
//   }
// });
// setPost(updatedPosts);
