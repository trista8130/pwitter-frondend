import React, { useState, useEffect, useContext } from "react";
import classNames from "classnames";
import AuthorComment from "../AuthorComment";
import PostServices from "../../service/post";
import { AppContext } from "../../context";

export default function Comments({ comments, postId, isOpen, user, userId }) {
  const [postText, setPostText] = useState("");

  //   const handleClickAComment = (comment, i) => {
  //     const authorId = comment.authorId,
  //       commentIndex = i;
  //     console.log(postId, authorId, commentIndex);

  //     if (comment.likes.indexOf(userId) < 0) {
  //       const handleLikeAComment = async () => {
  //         await PostServices.handleLikeAComment({
  //           authorId,
  //           postId,
  //           commentIndex,
  //         });
  //       };
  //       return handleLikeAComment();
  //     } else {
  //       const handleUnLikeAComment = async () => {
  //         await PostServices.handleUnLikeAComment({
  //           authorId,
  //           postId,
  //           commentIndex,
  //         });
  //       };
  //       return handleUnLikeAComment();
  //     }
  //   };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setPostText(value);
  };

  const handleCreateComment = async () => {
    const authorId = userId,
      text = postText;
    await PostServices.handleCreateComment({ authorId, postId, text });
    setPostText("");
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
            />
            {/* <button
              className="comment-like"
              onClick={() => handleClickAComment(comment, i)}
            >
              Like <i class="far fa-heart"></i> {i}
            </button> */}
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
