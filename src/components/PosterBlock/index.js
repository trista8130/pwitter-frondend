import React, { useEffect, useState } from "react";
import UserServices from "../../service/users";

export default function PosterBlock({ userId }) {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchFriendInfo = async () => {
      const response = await UserServices.handleFindUserById(userId);
      setUser(response.data.data);
    };
    fetchFriendInfo();
  }, [userId]);
  return (
    <div className="user-block">
      <img src={user.avatar} alt="profile" />
      <div className="user-info">
        <div className="name">
          <span className="span1">
            {user.firstName} {user.lastName}
          </span>
          <span className="span2">post a status</span>
        </div>
        <div className="time">6 Hours ago</div>
      </div>
    </div>
  );
}
