import React, { useEffect, useState } from "react";
import UserServices from "../../service/users";
import PostServices from "../../service/post";

export default function AuthorComment({ comment,userId, text }) {
  console.log(comment);
  const [author, setAuthor] = useState({});
  useEffect(() => {
    const fetchFriends = async () => {
      const response = await UserServices.handleFindUserById(userId);
      setAuthor(response.data.data);
    };
    fetchFriends();
  }, [userId]);

  
  return (
    <div className="comments-info">
      <img src={author.avatar} alt="profile" />
      <div className="comment">
        <span className="span1">
          {author.firstName} {author.lastName}
        </span>
        <span className="span2">{text}</span>
      </div>
    </div>
  );
}
