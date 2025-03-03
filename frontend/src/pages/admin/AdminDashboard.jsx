import "./admin.css";
import AdminMain from "./AdminMain";
import AdminSidebar from "./AdminSidebar";

const AdminDashboard = () => {
    return ( 
    <section className="admin-dashboard mt-14">
       <AdminSidebar />
       <AdminMain />
    </section> );
}
 
export default AdminDashboard;