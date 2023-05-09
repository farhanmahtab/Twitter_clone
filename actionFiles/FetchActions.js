export const fetchPosts = async (page, setPosts, setLoading) => {
  try {
    setLoading(true);
    const res = await fetch(
      `http://localhost:3000/api/post/posts?page=${page}`
    );
    const data = await res.json();
    //console.log(data.posts);
    setPosts((prevPosts) => [...prevPosts, ...data.posts]);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

export const fetchPostByUserID = async (userId, setPost) => {
  const res = await fetch(`/api/post/userPost?id=${userId}`);
  const data = await res.json();
  setPost(data.posts);
};

export const fetchComment = async (id, setComment) => {
  try {
    const res = await fetch(`/api/post/comments?postId=${id}`);
    const data = await res.json();
    setComment(data.comments);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const fetchUsers = async (userID, setUsers) => {
  try {
    const res = await fetch(`/api/user?=id${userID}`);
    const data = await res.json();
    //console.log(data)
    setUsers(data.users);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const fetchUserById = async (userId, setUser) => {
  try {
    const res = await fetch(`/api/user/${userId}`);
    const data = await res.json();
    setUser(data.user);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const fetchUserFromSearch = async (str, setUsers, search) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  try {
    const response = await fetch(
      "/api/messages/searchUser?search=" + (str == "" ? str : search),
      requestOptions
    );
    const result = await response.json();

    if (response.ok) {
      setUsers(result.users);
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
export const fetchFollowing = async (userId, setFollowing) => {
  const res = await fetch(`/api/user/following?id=${userId}`);
  const data = await res.json();
  setFollowing(data.following);
};

export const fetchFollowers = async (userId, setFollowers) => {
  const res = await fetch(`/api/user/follower?id=${userId}`);
  const data = await res.json();
  setFollowers(data.followers);
};