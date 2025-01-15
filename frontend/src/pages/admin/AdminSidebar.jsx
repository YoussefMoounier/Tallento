import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="p-4">
      <Link className="admin-sidebar-link" to="/admin-dashboard/users-table">
        <i className="bi bi-person"></i>
        المستخدمين
      </Link>
      <Link className="admin-sidebar-link" to="/admin-dashboard/posts-table">
        <i className="bi bi-file-post"></i>
        المنشورات
      </Link>
      <Link className="admin-sidebar-link" to="/admin-dashboard/categories-table">
        <i className="bi bi-tag-fill"></i>
        الاقسام
      </Link>
      <Link className="admin-sidebar-link" to="/admin-dashboard/comments-table">
        <i className="bi bi-chat-left-text"></i>
        التعليقات
      </Link>
      <Link className="admin-sidebar-link" to="/admin-dashboard/messages-table">
        <i className="bi bi-envelope"></i>
        الرسائل
      </Link>
      <Link className="admin-sidebar-link" to="/admin-dashboard/skills-table">
        <i className="bi bi-lightbulb"></i>
        المهارات
      </Link>
      <Link className="admin-sidebar-link" to="/admin-dashboard/block">
        <i className="bi bi-ban"></i>
        قائمة الحظر
      </Link>
    </div>
  );
};

export default AdminSidebar;