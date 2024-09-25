import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createChat } from "../redux/slices/chatSlice";
import { toast } from "react-toastify";

export const useStartChat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startChatHandler = async (user, id) => {
    try {
      if (!user?._id || !id) {
        throw new Error("Invalid user IDs");
      }

      // Create a unique room name using both user IDs
      const roomName = [user._id, id].sort().join("_");

      // Dispatch chat creation action
      const response = await dispatch(
        createChat({
          users: [user._id, id],
          roomName: roomName,
        })
      ).unwrap();

      // Navigate to the chat room
      navigate(`/chats/${roomName}`);
    } catch (error) {
      console.error("Chat creation error:", error);
      toast.error(
        "Failed to start chat: " + (error.message || "Unknown error")
      );
    }
  };

  return startChatHandler;
};
