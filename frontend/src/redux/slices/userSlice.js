import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk for blocking user and sending email
export const blockUser = createAsyncThunk(
  "user/blockUser",
  async (userId, { dispatch }) => {
    // Block user
    const response = await axios.patch(`/api/users/block/${userId}`);
    const user = response.data.user;

    // Send email to user
    await axios.post("/api/email/send-email", {
      userEmail: user.email,
      subject: "You have been blocked",
      htmlTemplate: "<p>You have been blocked from using our platform. If you have any questions, please contact support.</p>",
    });

    return user;
  }
);

// Thunk for unblocking user and sending email
export const unblockUser = createAsyncThunk(
  "user/unblockUser",
  async (userId, { dispatch }) => {
    // Unblock user
    const response = await axios.patch(`/api/users/unblock/${userId}`);
    const user = response.data.user;

    // Send email to user
    await axios.post("/api/email/send-email", {
      userEmail: user.email,
      subject: "You have been unblocked",
      htmlTemplate: "<p>You have been unblocked and can now use our platform again. If you have any questions, please contact support.</p>",
    });

    return user;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(blockUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(unblockUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
