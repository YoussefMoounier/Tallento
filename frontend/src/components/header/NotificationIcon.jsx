import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const NotificationIcon = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const notificationRef = useRef(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Temporary mock notifications - will be replaced with real data
  useEffect(() => {
    if (user) {
      setNotifications([
        { id: 1, type: "like", message: "Someone liked your post", isRead: false },
        { id: 2, type: "comment", message: "New comment on your post", isRead: false },
        { id: 3, type: "message", message: "You have a new message", isRead: true },
      ]);
      setUnreadCount(2);
    }
  }, [user]);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const markAsRead = (notificationId) => {
    setNotifications(notifications.map(notif => {
      if (notif.id === notificationId) {
        return { ...notif, isRead: true };
      }
      return notif;
    }));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  return (
    <div className="relative " ref={notificationRef}>
      <div 
        className="cursor-pointer flex items-center"
        onClick={handleNotificationClick}
      >
        <i className="bi bi-bell text-xl"></i>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {unreadCount}
          </span>
        )}
      </div>

      {showNotifications && (
        <div className="absolute -right-32 mt-2 w-80 bg-white rounded-md shadow-lg z-50 ">
          <div className="p-2 border-b">
            <h3 className="text-lg font-semibold">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${!notification.isRead ? 'bg-blue-50' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-center">
                    <i className={`bi bi-${notification.type === 'like' ? 'heart' : notification.type === 'comment' ? 'chat' : 'envelope'} mr-2`}></i>
                    <span>{notification.message}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;