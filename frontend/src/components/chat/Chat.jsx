import React, { useEffect, useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addMessage,
  addNotification,
  setActiveChat,
  setMessages,
  clearNotifications,
  fetchUserChats,
} from "../../redux/slices/chatSlice";
import { setOnlineUsers } from "../../redux/slices/authSlice";
import socket from "../../socket";
import "./ChatApp.css";
import { toast } from "react-toastify";



const Chat = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { messages, activeChat, notifications, chats, loading } = useSelector(
    (state) => state.chat
  );
  const [message, setMessage] = useState("");
  const [otherUserImg, setOtherUserImg] = useState("");
  const messagesEndRef = useRef(null);


  useEffect(() => {
    socket.on("messageBlocked", (data) => {
      toast(data.reason); // Show an alert or handle this appropriately in your UI
    });

    return () => {
      socket.off("messageBlocked");
    };
  }, [dispatch]);
  
  useEffect(() => {
    if (user) {
      dispatch(fetchUserChats(user._id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    const handleOnlineUsers = (users) => {
      dispatch(setOnlineUsers(users));
    };

    const handleNewMessage = (newMessage) => {
      dispatch(addMessage({ chatId: newMessage.chatId, message: newMessage }));
      if (newMessage.senderId !== user._id) {
        dispatch(addNotification(newMessage));
      }
    };

    const handleNotification = (notification) => {
      dispatch(addNotification(notification));
    };

    socket.on("getOnlineUsers", handleOnlineUsers);
    socket.on("getMessage", handleNewMessage);
    socket.on("getNotifications", handleNotification);

    return () => {
      socket.off("getOnlineUsers", handleOnlineUsers);
      socket.off("getMessage", handleNewMessage);
      socket.off("getNotifications", handleNotification);
    };
  }, [dispatch, user._id]);

  useEffect(() => {
    // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeChat]);

  const handleSendMessage = useCallback(() => {
    if (message.trim() && activeChat) {
      const newMessage = {
        chatId: activeChat,
        senderId: user._id,
        content: message.trim(),
        createdAt: new Date().toISOString(),
      }
      socket.emit("sendMessage", newMessage);
      dispatch(addMessage({ chatId: activeChat, message: newMessage }));
      setMessage("");
    }
  }, [message, activeChat, user._id, dispatch]);

  const handleOpenChat = useCallback(
    (chatId, other) => {
      setOtherUserImg(other?.profilePhoto?.url);
      dispatch(setActiveChat(chatId));
      socket.emit("fetchMessages", { chatId }, (fetchedMessages) => {
        dispatch(setMessages({ chatId, messages: fetchedMessages }));
        dispatch(clearNotifications(chatId));
      });
    },
    [dispatch]
  );

  const renderChatList = () => (
    <ul>
      {chats.map((chat) => {
        const otherParticipant = chat.participants.find(
          (participant) => participant._id !== user._id
        );
        return (
          <li
            key={chat._id}
            onClick={() => handleOpenChat(chat._id, otherParticipant)}
            className="chat-avatar"
          >
           
            <img
              className="other-user-img"
              src={otherParticipant?.profilePhoto?.url}
              alt=""
            />
            {notifications.some((notif) => notif.chatId === chat._id) && (
              <span className="chat-notification-dot">•</span>
            )} 
            {otherParticipant?.username}
          </li>
        );
      })}
    </ul>
  );

  const renderChatMessages = () => {
    const chatMessages = messages[activeChat] || [];
    return (
      <div className="chat-messages">
        {chatMessages.map((msg, index) => (
          <div
            key={msg._id || index}
            className={`chat-message ${
              msg.senderId === user._id
                ? "chat-message-user"
                : "chat-message-other"
            }`}
          >
            <img
              className="other-user-img"
              src={
                msg.senderId === user._id ? user.profilePhoto.url : otherUserImg
              }
              alt=""
            />
            <span>{msg.content}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    );
  };

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <h2>Chats</h2>
        {loading ? <p>Loading...</p> : renderChatList()}
      </div>
      <div className="chat-room">
        <h2>Chat Room</h2>
        {activeChat ? (
          <>
            {renderChatMessages()}
            <div className="chat-input-container">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="chat-input"
              />
              <button onClick={handleSendMessage} className="chat-send-button">
                Send
              </button>
            </div>
          </>
        ) : (
          <p>Select a chat to view messages</p>
        )}
      </div>
    </div>
  );
};

export default Chat;
