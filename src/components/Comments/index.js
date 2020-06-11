import React, { useState, useEffect, useContext } from "react";
import classNames from "classnames";
import AuthorComment from "../AuthorComment";
import PostServices from "../../service/post";
import { AppContext } from "../../context";

export default function Comments({ comments, postId, isOpen, user }) {
  const [postText, setPostText] = useState("");

  const handleClickAComment = async (comment, i) => {
    const authorId = window.localStorage.getItem("userId"),
      commentIndex = i.toString();

    const result = await PostServices.handleLikeAComment({
      authorId,
      postId,
      commentIndex,
    });

    if (!result.data.success) {
      const result2 = await PostServices.handleUnLikeAComment({
        authorId,
        postId,
        commentIndex,
      });
    }

    window.location.reload();
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setPostText(value);
  };

  const handleCreateComment = async () => {
    const authorId = window.localStorage.getItem("userId"),
      text = postText;
    await PostServices.handleCreateComment({ authorId, postId, text });
    setPostText("");
    window.location.reload();
  };

  return (
    <div
      className={classNames(`comments-container`, {
        nonactive: !isOpen,
      })}
    >
      {comments &&
        comments.map((comment, i) => (
          <div className="comments-block">
            <AuthorComment
              userId={comment.authorId}
              text={comment.text}
              key={i}
              comment={comment}
            />
            {comment.likes ? (
              <button
                className="comment-like"
                onClick={() => handleClickAComment(comment, i)}
              >
                Like <i class="far fa-heart"></i> {comment.likes.length}
              </button>
            ) : (
              <button
                className="comment-like"
                onClick={() => handleClickAComment(comment, i)}
              >
                Like <i class="far fa-heart"></i> 0
              </button>
            )}
          </div>
        ))}
      <div className="comment-post">
        <img src={user.avatar} alt="profile" />
        <form
          onSubmit={(e) => {
            handleCreateComment();
            e.preventDefault();
          }}
        >
          <input
            type="text"
            placeholder="Write a comment..."
            value={postText}
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
}
