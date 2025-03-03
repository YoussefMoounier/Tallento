import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { blockUser, unblockUser } from "./userSlice";

const blockSlice = createSlice({
  name: "block",
  initialState: {
    blocklist: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchBlockedUsersSuccess: (state, action) => {
      state.loading = false;
      state.blocklist = action.payload;
      state.error = null;
    },
    fetchBlockedUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    unblockUserSuccess: (state, action) => {
      state.blocklist = state.blocklist.filter(
        (user) => user._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlockedUsers.fulfilled, (state, action) => {
        state.blocklist = action.payload;
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        state.blocklist.push(action.payload);
      })
      .addCase(unblockUser.fulfilled, (state, action) => {
        state.blocklist = state.blocklist.filter(
          (user) => user._id !== action.payload._id
        );
      });
  },
});

export const {
  setLoading,
  fetchBlockedUsersSuccess,
  fetchBlockedUsersFailure,
  unblockUserSuccess,
} = blockSlice.actions;

export const fetchBlockedUsers = createAsyncThunk(
  "block/fetchBlockedUsers",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading());
      const { data } = await axios.get("/api/users/blocked");
      dispatch(fetchBlockedUsersSuccess(data.blockedUsers || []));
    } catch (error) {
      dispatch(
        fetchBlockedUsersFailure(error.response?.data?.message || error.message)
      );
    }
  }
);

export default blockSlice.reducer;
