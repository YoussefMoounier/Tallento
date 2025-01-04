import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../utils/request";

// Thunk to fetch user chats
export const fetchUserChats = createAsyncThunk(
  "chat/fetchUserChats",
  async (userId) => {
    const response = await request.get(`/api/chats/user/${userId}`);
    return response.data;
  }
);

// Thunk to mark messages as read
export const markMessagesAsRead = createAsyncThunk(
  "chat/markMessagesAsRead",
  async ({ chatId, userId }) => {
    await request.put(`/api/chats/read/${chatId}`, { userId });
    return { chatId };
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    onlineUsers: [],
    messages: {},
    activeChat: null,
    notifications: [],
    chats: [], // Store the list of chats
    loading: false, // Add loading state for async operations
  },
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setMessages: (state, action) => {
      const { chatId, messages } = action.payload;
      state.messages[chatId] = messages;
      if (state.activeChat === chatId) {
        state.messages[chatId] = messages;
      }
    },
    addMessage: (state, action) => {
      const { chatId, message } = action.payload;
      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }
      state.messages[chatId].push(message);
      const chat = state.chats.find((chat) => chat._id === chatId);
      if (chat) {
        if (!chat.messages) {
          chat.messages = [];
        }
        chat.messages.push(message);
      }
    },
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
      const activeChat = state.chats.find(
        (chat) => chat._id === action.payload
      );
      if (activeChat && activeChat.messages) {
        state.messages[action.payload] = activeChat.messages;
      }
    },
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    clearNotifications: (state, action) => {
      state.notifications = state.notifications.filter(
        (notif) => notif.chatId !== action.payload
      );
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    addChat: (state, action) => {
      state.chats.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserChats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserChats.fulfilled, (state, action) => {
        state.chats = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserChats.rejected, (state) => {
        state.loading = false;
      })
      .addCase(markMessagesAsRead.fulfilled, (state, action) => {
        const { chatId } = action.payload;
        const chat = state.chats.find((chat) => chat._id === chatId);
        if (chat && chat.messages) {
          chat.messages = chat.messages.map((msg) => ({
            ...msg,
            read: true,
          }));
        }
        if (state.messages[chatId]) {
          state.messages[chatId] = state.messages[chatId].map((msg) => ({
            ...msg,
            read: true,
          }));
        }
      });
  },
});

export const {
  setOnlineUsers,
  setMessages,
  addMessage,
  setActiveChat,
  addNotification,
  clearNotifications,
  setChats,
  addChat,
} = chatSlice.actions;

export default chatSlice.reducer;
