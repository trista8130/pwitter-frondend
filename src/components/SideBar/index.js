import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import { AppContext } from "../../context";

export default function SideBar({ setLogin, isActive, handleSideBar }) {
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userId");
  
    // setLogin(false);
  };

  return (
    <div
      onClick={handleSideBar}
      className={`${isActive ? "" : "nonactive"} side-bar`}
    >
      <div className="links">
        <Link to="/profile">Profile</Link>
      </div>
      <div className="links">
        <Link to="profile-setting">Setting</Link>
      </div>

      <div onClick={handleLogout} className="links">
        <Link to="/register">Log Out</Link>
      </div>
    </div>
  );
}
