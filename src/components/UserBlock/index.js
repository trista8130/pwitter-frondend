import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context";
import "./index.scss";
import { Link } from "react-router-dom";
import UserServices from "../../service/users";

export default function UserBlock() {
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

  return (
    <div className="user-container">
      <div className="user-block">
        <div className="user">
          <div className="user-profile">
            <img src={subUser.avatar} alt="user-profile" />
          </div>
          <div className="user-info">
            <p className="user-name">
              {subUser.firstName} {subUser.lastName}
            </p>
            <div className="user-links">
              <Link className="link" to="/status">
                <h3>Status</h3>
              </Link>
              <Link to="/profile">
                <h3>Profile</h3>
              </Link>
              <Link to="/friends">
                <h3>Friends</h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
