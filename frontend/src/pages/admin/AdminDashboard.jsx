import "./admin.css";
import AdminMain from "./AdminMain";
import AdminSidebar from "./AdminSidebar";

const AdminDashboard = () => {
    return ( 
    <section className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar />
      <div className="flex-1 p-8 overflow-hidden">
        <AdminMain />
      </div>
    </section> );
}
 
export default AdminDashboard;