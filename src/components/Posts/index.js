import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context";
import PostServices from "../../service/post";
import "./index.scss";
import Comments from "../Comments";
import UserServices from "../../service/users";

export default function Posts({ userId, page }) {
  const { user } = useContext(AppContext);

  const friendId = window.localStorage.getItem("friendId");
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

  const [posts, setPosts] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      const response = await PostServices.handleFindPostByUser(userId, page);
      setPosts(response.data.data.data);
    };
    fetchUserPosts();
  }, [user]);

  const handleClickLike = async (post) => {
    const authorId = post.authorId,
      postId = post._id;

    if (post.likes.indexOf(userId) < 0) {
      const response = await PostServices.handleLikeAPost({
        authorId,
        postId,
      });
    } else {
      await PostServices.handleUnLikeAPost({ authorId, postId });
    }

    window.location.reload();
  };

  const handleCommentsActive = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="status-container">
      {posts &&
        posts.map((post, i) => (
          <div className="status-block" key={i}>
            <div className="user-block">
              <img src={subUser.avatar} alt="profile" />
              <div className="user-info">
                <div className="name">
                  <span className="span1">
                    {subUser.firstName} {subUser.lastName}
                  </span>

                  <span className="span2">post a status</span>
                </div>
                <div className="time">6 Hours ago</div>
              </div>
            </div>
            <div className="post">{post.text}</div>
            <div className="buttons">
              <button onClick={() => handleClickLike(post)}>
                <i class="far fa-heart"></i> {post.likes.length}
              </button>
              <button onClick={handleCommentsActive}>
                <i class="far fa-comment-dots"></i> {post.comments.length}
              </button>
            </div>
            <Comments
              user={user}
              comments={post.comments}
              postId={post._id}
              userId={userId}
              page={page}
              isOpen={isOpen}
            />
          </div>
        ))}
    </div>
  );
}
