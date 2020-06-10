import React, { useState, useContext, useEffect } from "react";

import { AppContext } from "../../context";
import UserServices from "../../service/users";
import { Link } from "react-router-dom";

export default function Friends({ page, user }) {
  const userId = user._id;
  const [friends, setFriends] = useState([]);

  const handlePageChange = async () => {
    const response = await UserServices.handleGetMyFriends(userId, page);
    setFriends(response.data.data.data);
  };
  useEffect(() => {
    handlePageChange(1);
  }, [user]);

  const handleDeleteFriend = async (friend) => {
    const friendId = friend._id;
    await UserServices.handleRemoveFriendship({ userId, friendId });
    window.location.reload();
  };

  const handleClickFriend = (friend) => {
    const id = friend._id;
    window.localStorage.setItem("friendId", id);
    
  };

  return (
    <div className="friends-list">
      {friends.map((friend, i) => (
        <div className="friends-block" key={i}>
          <Link to="/friends">
            <img
              src={friend.avatar}
              alt="profile"
              onClick={() => handleClickFriend(friend)}
            />
          </Link>
          <div className="friends-info">
            <div className="user-name">
              {friend.firstName} {friend.lastName}
            </div>
            <div className="friends-num">{`${friend.friends.length} Friends`}</div>
          </div>
          <button
            onClick={() => {
              handleDeleteFriend(friend);
            }}
          >
            <i class="far fa-times-circle"></i>
          </button>
        </div>
      ))}
    </div>
  );
}
