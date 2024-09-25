import { Link } from "react-router-dom";

const AdminSidebar = () => {
    return (
      <div className="admin-sidebar">
        <Link to="/admin-dashboard" className="admin-sidebar-title">
          <i className="bi bi-columns"></i>
          Dashboard
        </Link>
        <ul className="admin-dashboard-list">
          <Link
            className="admin-sidebar-link"
            to="/admin-dashboard/users-table"
          >
            <i className="bi bi-person"></i>
            المستخدمين
          </Link>
          <Link
            className="admin-sidebar-link"
            to="/admin-dashboard/posts-table"
          >
            <i className="bi bi-file-post"></i>
            المنشورات
          </Link>
          <Link
            className="admin-sidebar-link"
            to="/admin-dashboard/categories-table"
          >
            <i className="bi bi-tag-fill"></i>
            التصنيفات
          </Link>
          <Link
            className="admin-sidebar-link"
            to="/admin-dashboard/comments-table"
          >
            <i className="bi bi-chat-left-text"></i>
            التعليقات
          </Link>
          <Link className="admin-sidebar-link" to="/admin-dashboard/block">
            <i className="bi bi-ban"></i>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-ban"
              viewBox="0 0 16 16"
            >
              <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0" />
            </svg>
            قائمة الحظر
          </Link>
        </ul>
      </div>
    );
}
 
export default AdminSidebar;