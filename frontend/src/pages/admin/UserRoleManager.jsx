import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, updateUserRole } from "../../redux/apiCalls/userApiCall";
import "./admin-table.css";

const UserRoleManager = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [selectedUser, setSelectedUser] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleUserChange = (e) => {
    const userId = e.target.value;
    const user = users.find((user) => user._id === userId);
    setSelectedUser(user);
    setRole(user.isAdmin ? true : false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser) {
      dispatch(updateUserRole(selectedUser._id, role));
    }
  };

  return (
    <div className="user-role-manager">
      <h3>Manage User Roles</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="user">Select User</label>
          <select id="user" onChange={handleUserChange}>
            <option value="">Select a user</option>
            {Array.isArray(users) && users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        {selectedUser && (
          <div className="form-group">
            <label htmlFor="role">Select Role</label>
            <select id="role" value={role} onChange={handleRoleChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}
        <button type="submit">Update Role</button>
      </form>
    </div>
  );
};

export default UserRoleManager;
