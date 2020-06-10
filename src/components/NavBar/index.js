import React, { useContext, useState, useEffect } from "react";
import "./index.scss";
import SideBar from "../SideBar";
import { Link } from "react-router-dom";

import { AppContext } from "../../context";

export default function NavBar() {
  const { user } = useContext(AppContext);
  const token = window.localStorage.getItem("token");

  const [isActive, setIsActive] = useState(false);
  const handleSideBar = () => {
    setIsActive(!isActive);
  };

  const handleRemoveFriendId = () => {
    window.localStorage.removeItem("friendId");
  };

  return (
    <div>
      {token && (
        <div className="nav-container" onClick={handleRemoveFriendId}>
          <div className="nav-bar">
            <div className="nav-links">
              <div className="logo">
                <img src={require("../../assets/logo.png")} alt="logo" />
              </div>
              <div className="page-links">
                <Link to="/">Home</Link>
              </div>
              <div className="page-links">
                <Link to="/status">Status</Link>
              </div>
              <div className="page-links">
                <Link to="/friends">Friends</Link>
              </div>
              <div className="page-links">
                <Link to="/profile">Profile</Link>
              </div>
            </div>
            <div className="nav-user" onClick={handleSideBar}>
              <img src={user.avatar} alt="user-profile" />
              <p>
                {user.firstName} {user.lastName}
              </p>
            </div>
          </div>
          <SideBar isActive={isActive} handleSideBar={handleSideBar} />
        </div>
      )}
    </div>
  );
}
