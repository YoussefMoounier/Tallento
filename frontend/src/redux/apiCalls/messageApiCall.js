import { setMessages, removeMessage } from "../slices/messageSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Fetch all messages
export function fetchAllMessages() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get("/api/messages/all-messages", {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(setMessages(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Delete message
export function deleteMessage(messageId) {
  return async (dispatch, getState) => {
    try {
      await request.delete(`/api/messages/${messageId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(removeMessage(messageId));
      toast.success("Message deleted successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}