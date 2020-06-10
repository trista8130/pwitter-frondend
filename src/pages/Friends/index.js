import React, { useState, useContext, useEffect } from "react";
import UserBlock from "../../components/UserBlock";
import { AppContext } from "../../context";
import "./index.scss";
import UserServices from "../../service/users";
import Friends from "../../components/Friends";

export default function FriendsPage() {
  const { user } = useContext(AppContext);
 
  const friendId = window.localStorage.getItem("friendId");
  const userId = friendId;
  const [friendInfo, setFriendInfo] = useState({});
  useEffect(() => {
    const fetchFriendInfo = async () => {
      const response = await UserServices.handleFindUserById(userId);
      setFriendInfo(response.data.data);
    };
    fetchFriendInfo();
  }, [userId]);

  let subUser;
  if (friendId) {
    subUser = friendInfo;
  } else {
    subUser = user;
  }

  let total, allFriends;
  if (subUser.friends) {
    allFriends = subUser.friends.length;
    total = Math.ceil(allFriends / 10) - 1;
  }

  const pages = [];
  for (let i = 0; i <= total; i++) {
    pages.push(i);
  }

  return (
    <div className="friends-page page mt-70">
      <UserBlock />
      <div className="friends-container">
        <div className="title">
          <h2>My Friends</h2>
        </div>

        {pages.map((v) => (
          <Friends page={v} user={subUser} />
        ))}
      </div>
    </div>
  );
}
