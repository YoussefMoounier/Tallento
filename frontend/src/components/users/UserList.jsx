import React from 'react';
import UserItem from './UserItem';

export default function UserList({ users }) {
  return (
    <div className="user-list">
      {users?.map(user => (
        <UserItem key={user._id} user={user} />
      ))}
    </div>
  );
}