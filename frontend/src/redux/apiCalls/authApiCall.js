import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Utility function to handle storing user data
const storeUserData = (user) => {
  localStorage.setItem("userInfo", JSON.stringify(user));
};

// Utility function to handle logout request
const logoutRequest = async () => {
  try {
    await request.get("/google/logout", { withCredentials: true });
  } catch (error) {
    console.error("Logout request failed", error);
  }
};

// Login with Google
export function loginUserGoogle() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/google/login/success", {
        withCredentials: true,
      });
      if (data.error) {
        toast.error(data.message);
      } else {
        dispatch(authActions.login(data.user));
        storeUserData(data.user);
      }
    } catch (error) {
      toast.error("Failed to login with Google");
      console.log(error);
    }
  };
}

// Login with email and password
export function loginUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/login", user);
      dispatch(authActions.login(data));
      storeUserData(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Logout user
export function logoutUser() {
  return async (dispatch) => {
    dispatch(authActions.logout()); // Clear Redux state
    await logoutRequest(); // Call backend logout route
    localStorage.removeItem("userInfo"); // Clear localStorage
    // Optionally clear session cookies if needed
  };
}

// Register user
export function registerUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/register", user);
      dispatch(authActions.register(data.message));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Verify email
export function verifyEmail(userId, token) {
  return async (dispatch) => {
    try {
      await request.get(`/api/auth/${userId}/verify/${token}`);
      dispatch(authActions.setIsEmailVerified());
    } catch (error) {
      console.log(error);
    }
  };
}
