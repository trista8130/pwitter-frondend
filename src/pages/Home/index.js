import React, { useEffect, useContext, useState } from "react";
import "./index.scss";

import MyFriends from "../../components/MyFriends";
import FriendsMayKnow from "../../components/FriendsMayKnow";

import FriendsPosts from "../../components/FriendsPosts";
import ShareStatus from "../../components/ShareStatus";

import { AppContext } from "../../context";
import PostServices from "../../service/post";

export default function HomePage() {
  const { user } = useContext(AppContext);
  window.localStorage.setItem("userId", user._id);

  return (
    <div className="home-page page mt-70">
      <div className="friends-container">
        <MyFriends />
        <FriendsMayKnow />
      </div>
      <div className="status-section">
        <ShareStatus />
        <FriendsPosts />
      </div>
    </div>
  );
}
