import React, { useEffect, useContext, useState } from "react";
import UserServices from "../../service/users";
import { AppContext } from "../../context";
import "./index.scss";

export default function FriendsMayKnow() {
  const { user } = useContext(AppContext);
  const page = 0,
    userId = user._id;

  const [strangers, setStrangers] = useState([]);
  const [isAdd, setIsAdd] = useState(null);

  useEffect(() => {
    const fetchStrangers = async () => {
      const response = await UserServices.handleGetStrangers(userId, page);
      setStrangers(response.data.data.data);
    };
    fetchStrangers();
  }, [user]);

  const handleAddFriends = async (stranger, i) => {
    setIsAdd(i);
    const friendId = stranger._id;
    await UserServices.handleCreateFriendship({
      userId,
      friendId,
    });
    window.location.reload();
  };

  return (
    <div className="strangers-block">
      <h2>Friends may know</h2>
      {strangers &&
        strangers.map(
          (stranger, i) =>
            stranger.firstName !== "Yolo" && (
              <div className="strangers-info">
                <img src={stranger.avatar} alt="profile" />
                <p>
                  {stranger.firstName} {stranger.lastName}
                </p>
                <button onClick={() => handleAddFriends(stranger, i)}>
                  {isAdd === i ? (
                    <i class="fas fa-check"></i>
                  ) : (
                    <i class="fas fa-plus-circle"></i>
                  )}
                </button>
              </div>
            )
        )}
    </div>
  );
}
