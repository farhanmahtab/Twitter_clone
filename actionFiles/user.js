export const UserActions = {
  postUser: "POST_USER",
  patchUser: "PATCH_USER",
  followUser: "FOLLOW_USER",
  unfollowUser: "UNFOLLOW_USER",
};

export const UserReducer = (state, action) => {
  switch (action.type) {
    case UserActions.postUser:
      postUser(action.payload);
      break;
    case UserActions.patchUser:
      patchUser(action.payload);
      break;
    case UserActions.followUser:
      followUser(action.payload);
      break;
    case UserActions.unfollowUser:
      unfollowUser(action.payload);
      break;
    default:
      return state;
  }
};

export const UserDispatch = (action) => {
  UserReducer(null, action);
};


const postUser = async ({ userData }) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };
  try {
    const response = await fetch("/api/user", requestOptions);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const patchUser = async ({ userId, formData, setUser }) => {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };
  try {
    const res = await fetch(`/api/user/${userId}`, requestOptions);
    const data = await res.json();
    setUser(data.user);
  } catch (error) {
    console.error(error);
  }
};

const followUser = async ({
  userId,
  currentUserId,
  isFollowed,
  setIsFollowed,
  followData,
  setfollowData,
}) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      currentUserId: currentUserId,
    }),
  };
  try {
    const res = await fetch(`/api/user/${userId}`, requestOptions);
    const updatedUsers = [...followData];
    setIsFollowed(!isFollowed);
    setfollowData(updatedUsers);
  } catch (error) {
    console.log(error);
  }
};

const unfollowUser = async ({
  userId,
  currentUserId,
  isFollowed,
  setIsFollowed,
  followData,
  setfollowData,
}) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      currentUserId: currentUserId,
    }),
  };
  try {
    const res = await fetch(`/api/user/${userId}`, requestOptions);
    const updatedUsers = [...followData];
    setIsFollowed(!isFollowed);
    setfollowData(updatedUsers);
  } catch (error) {
    console.log(error);
  }
};
