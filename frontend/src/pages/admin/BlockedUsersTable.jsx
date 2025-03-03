import { useEffect, useState } from "react";
import "./admin-table.css";
import axios from "axios";
import { toast } from "react-toastify";

const BlockedUsersTable = () => {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlockedUsers = async () => {
      try {
        const response = await axios.get("/api/block", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setBlockedUsers(response.data);
        setLoading(false);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching blocked users");
        setLoading(false);
      }
    };

    fetchBlockedUsers();
  }, []);

  const handleUnblock = async (userId, blockedUserId) => {
    try {
      await axios.patch(
        `/api/block/unblock/${blockedUserId}`,
        { userId, blockedUserId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setBlockedUsers(blockedUsers.filter(user => user.blockedUserId._id !== blockedUserId));
      toast.success("User unblocked successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error unblocking user");
    }
  };

  if (loading) {
    return <div className="admin-table-loading">Loading...</div>;
  }

  return (
    <div className="table-container">
      <h1 className="table-title">المستخدمين المحظورين</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Blocked By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blockedUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.blockedUserId.username}</td>
              <td>{user.blockedUserId.email}</td>
              <td>{user.userId.username}</td>
              <td>
                <button
                  className="btn-delete"
                  onClick={() => handleUnblock(user.userId._id, user.blockedUserId._id)}
                >
                  Unblock
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlockedUsersTable;