import React, { useEffect, useContext, useState } from "react";
import UserServices from "../../service/users";
import ReactPaginate from "react-paginate";
import { AppContext } from "../../context";
import "./index.scss";

export default function MyFriends() {
  const { user } = useContext(AppContext);
  const userId = user._id;
  const [page, setPage] = useState(1);
  const [friends, setFriends] = useState([]);

  let total, allFriends;
  if (user.friends) {
    allFriends = user.friends.length;

    total = Math.ceil(allFriends / 10);
  }
  const pages = [];
  for (let i = 1; i <= total; i++) {
    pages.push(i);
  }

  // const handlePageChange = (v) => {
  //   setPage(v);
  //   fetchFriends(1);
  // };

  const handlePageChange = async (v) => {
    setPage(v - 1);

    const response = await UserServices.handleGetMyFriends(userId, page);
    setFriends(response.data.data.data);
  };
  useEffect(() => {
    handlePageChange(1);
  }, [user]);

  // const [page, setPage] = useState(1);
  // const [maxPage, setMaxPage] = useState(1);
  // const handlePageChange = async ({ selected }) => {
  //   const response = await UserServices.handleGetMyFriends(userId, page);
  //   setFriends(response.data.data.data);
  //   setPage(response.data.data.page);
  //   setMaxPage(Math.floor(response.data.data.total / 7));
  // };
  // useEffect(() => {
  //   handlePageChange({ selected: 1 });
  // }, [user]);

  return (
    <div className="friends-block">
      <h2>My Friends</h2>
      <div className="friends-info-container">
        {friends &&
          friends.map((friend, i) => (
            <div className="friends-info" key={`${friend}${i}`}>
              <img src={friend.avatar} alt="profile" />
              <p>
                {friend.firstName} {friend.lastName}
              </p>
              <p className="num">{friend.friends.length}</p>
            </div>
          ))}
      </div>

      <div className="pages-container">
        {pages.map((v) => (
          <div
            className="page-block"
            key={`page ${v}`}
            onClick={() => handlePageChange(v)}
          >
            {v}
          </div>
        ))}
      </div>

      {/* <div className="pagination">
        <ReactPaginate
          pageCount={maxPage}
          initialPage={1}
          handlePageChange={handlePageChange}
        />
      </div> */}
    </div>
  );
}
