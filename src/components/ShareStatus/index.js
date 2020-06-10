import React, { useContext, useState } from "react";
import { AppContext } from "../../context";
import PostServices from "../../service/post";
import "./index.scss";

export default function ShareStatus() {
  const { user } = useContext(AppContext);
  const authorId = user._id,
    mood = "happy";
  const [text, setText] = useState("");
  const handleInputChange = (e) => {
    const { value } = e.target;
    setText(value);
  };

  const handleShareStatus = async () => {
    const response = await PostServices.handleCreatePost({
      authorId,
      mood,
      text,
    });
    
    setText("");
  };

  return (
    <div className="user-status">
      <div className="title">
        <span>Status</span>
      </div>
      <div className="text">
        <img src={user.avatar} alt="profile" />
        <input
          type="text"
          value={text}
          placeholder={`What’s on your mind, ${user.firstName}?`}
          onChange={handleInputChange}
        />
      </div>
      <div className="submit">
        <p>
          <i class="fas fa-smile"></i>
          Mood
        </p>
        <button onClick={handleShareStatus}>Share</button>
      </div>
    </div>
  );
}
