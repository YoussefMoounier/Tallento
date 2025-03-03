import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 w-64 space-y-6 py-7 px-4">
      <Link to="/admin-dashboard" className="flex items-center space-x-3 px-4 text-lg font-semibold text-gray-800 dark:text-white">
        <i className="bi bi-columns text-blue-600"></i>
        <span>لوحة التحكم</span>
      </Link>
      <nav className="space-y-2">
        <Link className="flex items-center space-x-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition duration-150" to="/admin-dashboard/users-table">
          <i className="bi bi-person text-gray-500 dark:text-gray-400"></i>
          <span>المستخدمين</span>
        </Link>
        <Link className="flex items-center space-x-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition duration-150" to="/admin-dashboard/posts-table">
          <i className="bi bi-file-post text-gray-500 dark:text-gray-400"></i>
          <span>المنشورات</span>
        </Link>
        <Link className="flex items-center space-x-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition duration-150" to="/admin-dashboard/categories-table">
          <i className="bi bi-tag-fill text-gray-500 dark:text-gray-400"></i>
          <span>الاقسام</span>
        </Link>
        <Link className="flex items-center space-x-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition duration-150" to="/admin-dashboard/comments-table">
          <i className="bi bi-chat-left-text text-gray-500 dark:text-gray-400"></i>
          <span>التعليقات</span>
        </Link>
        <Link className="flex items-center space-x-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition duration-150" to="/admin-dashboard/messages-table">
          <i className="bi bi-envelope text-gray-500 dark:text-gray-400"></i>
          <span>الرسائل</span>
        </Link>
        <Link className="flex items-center space-x-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition duration-150" to="/admin-dashboard/skills-table">
          <i className="bi bi-lightbulb text-gray-500 dark:text-gray-400"></i>
          <span>المهارات</span>
        </Link>
        <Link className="flex items-center space-x-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition duration-150" to="/admin-dashboard/block">
          <i className="bi bi-ban text-gray-500 dark:text-gray-400"></i>
          <span>قائمة الحظر</span>
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;