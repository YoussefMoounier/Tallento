import React, { useEffect, useState } from "react";
import request from "../../utils/request";
import UserItem from "./UserItem";
import "./user.css"; // Import CSS

const UserList = () => {
  const [blockList, setBlockList] = useState([]);

  const getBlockedUsers = async () => {
    try {
      const response = await request.get("/blocklist");
      setBlockList(response.data);
    } catch (error) {
      console.error("Error fetching blocklist:", error);
    }
  };

  const handleRemoveBlock = async (userId, blockedUserId) => {
    try {
      await request.delete(`/blocklist/${userId}/${blockedUserId}`);
      setBlockList((prevList) =>
        prevList.filter(
          (user) =>
            !(
              user?.userId?._id === userId &&
              user?.blockedUserId?._id === blockedUserId
            )
        )
      );
    } catch (error) {
      console.error("Error removing block:", error);
    }
  };

  useEffect(() => {
    getBlockedUsers();
  }, []);

  return (
    <div className="user-list">
      <h1>Blocked Users List</h1>
      {blockList.map((user) => (
        <UserItem
          key={user?.userId?._id}
          user={user?.userId}
          blockedUserId={user?.blockedUserId?._id}
          onRemoveBlock={handleRemoveBlock}
          createdAt={user?.createdAt} // Pass createdAt to UserItem
        />
      ))}
    </div>
  );
};

export default UserList;
