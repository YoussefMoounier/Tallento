import AdminSidebar from "./AdminSidebar";
import "./admin-table.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useContext } from "react";
import {
  deleteProfile,
  getAllUsersProfile,
} from "../../redux/apiCalls/profileApiCall";
import { updateUserRole } from "../../redux/apiCalls/userApiCall"; // Import the updateUserRole function
import { LanguageContext } from "../../context/LanguageContext"; // Import LanguageContext

const UsersTable = () => {
  const dispatch = useDispatch();
  const { profiles, isProfileDeleted } = useSelector((state) => state.profile);
  const { language } = useContext(LanguageContext); // Use LanguageContext

  useEffect(() => {
    dispatch(getAllUsersProfile());
  }, [isProfileDeleted]);

  // Delete User Handler
  const deleteUserHandler = (userId) => {
    swal({
      title: language === "en" ? "Are you sure?" : "هل أنت متأكد؟",
      text: language === "en" ? "Once deleted, you will not be able to recover this user!" : "بمجرد الحذف، لن تتمكن من استعادة هذا المستخدم!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteProfile(userId));
      }
    });
  };

  // Toggle Admin Role Handler
  const toggleAdminRoleHandler = (userId, isAdmin) => {
    const newRole = isAdmin ? 'user' : 'admin';
    dispatch(updateUserRole(userId, newRole));
  };

  return (
    <section className="flex flex-col md:flex-row">
      <AdminSidebar />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">{language === "en" ? "Users" : "المستخدمين"}</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">{language === "en" ? "Count" : "العدد"}</th>
                <th className="px-4 py-2 border-b">{language === "en" ? "User" : "المستخدم"}</th>
                <th className="px-4 py-2 border-b">{language === "en" ? "Email" : "البريد الإلكتروني"}</th>
                <th className="px-4 py-2 border-b">{language === "en" ? "Action" : "الإجراء"}</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b text-center">{index + 1}</td>
                  <td className="px-4 py-2 border-b">
                    <div className="flex items-center">
                      <img
                        src={item.profilePhoto?.url}
                        alt=""
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <span>{item.username}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 border-b">{item.email}</td>
                  <td className="px-4 py-2 border-b">
                    <div className="flex space-x-2">
                      <Link to={`/profile/${item._id}`} className="bg-blue-500 text-white px-3 py-1 rounded">
                        {language === "en" ? "View Profile" : "عرض الملف الشخصي"}
                      </Link>
                      <button
                        onClick={() => deleteUserHandler(item._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        {language === "en" ? "Delete User" : "حذف المستخدم"}
                      </button>
                      <button
                        onClick={() => toggleAdminRoleHandler(item._id, item.isAdmin)}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        {item.isAdmin ? (language === "en" ? "Revoke Admin" : "إلغاء صلاحية المدير") : (language === "en" ? "Make Admin" : "تعيين كمدير")}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>    
          </table>
        </div>
      </div>
    </section>
  );
};

export default UsersTable;
