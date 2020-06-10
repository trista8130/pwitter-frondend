import React, { useContext } from "react";
import { AppContext } from "../../context";

import UserBlock from "../../components/UserBlock";
import Posts from "../../components/Posts";

import "./index.scss";

export default function StatusPage() {
  const { user } = useContext(AppContext);

  const page = 0;
  let userId;

  const friendId = window.localStorage.getItem("friendId");

  if (friendId) {
    userId = friendId;
  } else {
    userId = user._id;
  }

  return (
    <div className="status-page page mt-70">
      <UserBlock />
      <Posts userId={userId} page={page} />
    </div>
  );
}
