import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context";
import PostServices from "../../service/post";

import Comments from "../Comments";
import PosterBlock from "../PosterBlock";

export default function FriendsPosts() {
  const { user } = useContext(AppContext);
  const userId = user._id,
    page = 0;
  const [posts, setPosts] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      const response = await PostServices.handleFindPostByFriends(userId, page);
      setPosts(response.data.data.data);
    };
    fetchUserPosts();
  }, [user]);

  const handleClickLike = (post) => {
    const authorId = post.authorId,
      postId = post._id;

    if (post.likes.indexOf(userId) < 0) {
      const handleLikeAPost = async () => {
        await PostServices.handleLikeAPost({
          authorId,
          postId,
        });
      };
      return handleLikeAPost();
    } else {
      const handleUnLikeAPost = async () => {
        await PostServices.handleUnLikeAPost({ authorId, postId });
      };
      return handleUnLikeAPost();
    }
  };
  const handleCommentsActive = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="status-container">
      {posts &&
        posts.map((post, i) => (
          <div className="status-block" key={i}>
            <PosterBlock userId={post.authorId} />
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
