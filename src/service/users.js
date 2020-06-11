import axios from "axios";
import getAPIUrl from "../constants/apiUrl";

const url = getAPIUrl();
const token = window.localStorage.getItem("token");

const handleGetAllUsers = () => {
  return axios.post(`${url}/users/fetch`);
};

const handleFindUserById = (userId) => {
  return axios.get(`${url}/users/find/byId`, {
    params: { userId },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

const handleGetCurrentUser = () => {
  return axios.post(
    `${url}/users/current`,
    {},
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

const handleProfileChange = ({ userId, field, value }) => {
  return axios.put(
    `${url}/users/update`,
    { userId, field, value },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

const handleGetStrangers = (userId, page) => {
  return axios.get(`${url}/users/strangers/byId`, {
    params: { userId, page },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

const handleGetMyFriends = (userId, page) => {
  return axios.get(`${url}/users/friends/byId`, {
    params: { userId, page },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

const handleCreateFriendship = ({ userId, friendId }) => {
  return axios.post(
    `${url}/users/friends/add`,
    { userId, friendId },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};
const handleRemoveFriendship = ({ userId, friendId }) => {
  return axios.post(
    `${url}/users/friends/remove`,
    { userId, friendId },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

const UserServices = {
  handleGetAllUsers,
  handleFindUserById,
  handleGetCurrentUser,
  handleProfileChange,
  handleGetStrangers,
  handleGetMyFriends,
  handleCreateFriendship,
  handleRemoveFriendship,
};

export default UserServices;
