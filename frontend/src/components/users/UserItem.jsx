import React from "react";
import "./user.css"; // Import CSS

const UserItem = ({ user, blockedUserId, onRemoveBlock, createdAt }) => {
  const handleRemoveClick = () => {
    onRemoveBlock(user._id, blockedUserId);
  };

  // Calculate days since blocked
  const daysSinceBlocked = Math.floor(
    (new Date() - new Date(createdAt)) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="user-item">
      <p>{user.username}</p>
      <img src={user?.profilePhoto?.url} alt={`${user.username}'s profile`} />
      <p>Blocked {daysSinceBlocked} days ago</p>
      <button onClick={handleRemoveClick}>Unblock</button>
    </div>
  );
};

export default UserItem;
