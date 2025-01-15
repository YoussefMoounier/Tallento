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

const Chat = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { messages, activeChat, chats, notifications, loading } = useSelector(
    (state) => state.chat
  );
  const [message, setMessage] = useState("");
  const [otherUserImg, setOtherUserImg] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserChats(user._id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    socket.on("getMessage", (newMessage) => {
      dispatch(addMessage({ chatId: newMessage.chatId, message: newMessage }));
      if (newMessage.senderId !== user._id) {
        dispatch(addNotification(newMessage));
      }
    });

    socket.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });

    return () => {
      socket.off("getMessage");
      socket.off("getOnlineUsers");
    };
  }, [dispatch, user._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeChat]);

  const handleSendMessage = useCallback(() => {
    if (message.trim() && activeChat) {
      const newMessage = {
        chatId: activeChat,
        senderId: user._id,
        content: message.trim(),
        createdAt: new Date().toISOString(),
      };
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
    <div className="p-4 bg-white h-full overflow-y-auto">
      {loading ? (
        <p>Loading...</p>
      ) : (
        chats.map((chat) => {
          const otherParticipant = chat.participants.find(
            (participant) => participant._id !== user._id
          );
          return (
            <div
              key={chat._id}
              onClick={() => handleOpenChat(chat._id, otherParticipant)}
              className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
            >
              <img
                src={otherParticipant?.profilePhoto?.url}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3 flex-1">
                <div className="font-bold">{otherParticipant?.username}</div>
                <p className="text-sm text-gray-500 truncate">
                  {chat.lastMessage?.content || "No messages yet"}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );

  const renderChatMessages = () => {
    const chatMessages = messages[activeChat] || [];
    return (
      <div className="flex flex-col  p-4 bg-gray-50 overflow-y-auto">
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end ${
              msg.senderId === user._id ? "justify-end" : "justify-start"
            } mb-3`}
          >
            {msg.senderId !== user._id && (
              <img
                src={otherUserImg}
                alt=""
                className="w-8 h-8 rounded-full mr-2"
              />
            )}
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                msg.senderId === user._id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    );
  };

  return (
    <div className="flex bg-gray-100">
      {/* Left Chat List */}
      <div className="w-1/3 bg-white border-r border-gray-300">
       
        {renderChatList()}
      </div>

      {/* Right Chat Window */}
      <div className="w-2/3 flex flex-col">
        {activeChat ? (
          <>
            {/* Header */}
            <div className="p-4 bg-white flex items-center border-b">
              <img
                src={otherUserImg}
                alt=""
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h2 className="text-lg font-bold">Chat Name</h2>
                <p className="text-sm text-gray-500">Online</p>
              </div>
            </div>

            {/* Messages */}
            {renderChatMessages()}

            {/* Input */}
            <div className="p-4 bg-white flex items-center border-t">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-grow p-3 border rounded-full mr-3"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-full"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-grow">
            <p className="text-gray-500">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
