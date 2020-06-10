import axios from "axios";
import getAPIUrl from "../constants/apiUrl";

const url = getAPIUrl();
const token = window.localStorage.getItem("token");

const handleCreatePost = ({ authorId, mood, text }) => {
  return axios.post(
    `${url}/posts/create`,
    { authorId, mood, text },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

const handleFindPostByUser = (userId, page) => {
  return axios.get(`${url}/posts/find/byUser`, {
    params: { userId, page },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

const handleFindPostByFriends = (userId, page) => {
  return axios.get(`${url}/posts/find/byFriends`, {
    params: { userId, page },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

const handleLikeAPost = ({ authorId, postId }) => {
  return axios.post(
    `${url}/posts/like`,
    { authorId, postId },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};
const handleUnLikeAPost = ({ authorId, postId }) => {
  return axios.post(
    `${url}/posts/unlike`,
    { authorId, postId },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

const handleLikeAComment = ({ authorId, postId, commentIndex }) => {
  return axios.post(
    `${url}/posts/comment/like`,
    { authorId, postId, commentIndex },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};
const handleUnLikeAComment = ({ authorId, postId, commentIndex }) => {
  return axios.post(
    `${url}/posts/comment/unlike`,
    { authorId, postId, commentIndex },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

const handleCreateComment = ({ authorId, postId, text }) => {
  return axios.post(
    `${url}/posts/comment/create`,
    { authorId, postId, text },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

const PostServices = {
  handleCreatePost,
  handleFindPostByUser,
  handleFindPostByFriends,
  handleLikeAPost,
  handleUnLikeAPost,
  handleLikeAComment,
  handleUnLikeAComment,
  handleCreateComment,
};

export default PostServices;
