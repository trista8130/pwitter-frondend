import React, { useContext, useEffect, useState } from "react";
import "./index.scss";
import UserBlock from "../../components/UserBlock";

import { AppContext } from "../../context";
import UserServices from "../../service/users";

export default function ProfilePage() {
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
    <div className="profile-page page mt-70">
      <UserBlock />
      <div className="profile-container">
        {/* cant'be changed */}
        <div className="title">
          <h2>My Profile</h2>
        </div>
        <form>
          {Object.entries(subUser).map(([key, value]) => {
            return (
              key !== "_id" &&
              key !== "friends" &&
              key !== "__v" &&
              key !== "password" && (
                <div className="info-block" key={key}>
                  <label> {`My ${key}`}</label>
                  {key === "avatar" ? (
                    <img src={value} alt="avatar" />
                  ) : (
                    <input type="text" placeholder={value} readOnly />
                  )}
                </div>
              )
            );
          })}
        </form>
      </div>
    </div>
  );
}
