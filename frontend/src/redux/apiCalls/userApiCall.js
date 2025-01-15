import { setUsers, updateUser } from "../slices/userSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Fetch all users
export function fetchAllUsers() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get("/api/users", {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(setUsers(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Update user role
export function updateUserRole(userId, role) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/users/${userId}/role`, { role }, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(updateUser(data));
      toast.success("User role updated successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
