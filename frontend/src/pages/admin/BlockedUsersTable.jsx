import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LanguageContext } from "../../context/LanguageContext";
import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";

const BlockedUsersTable = () => {
  const dispatch = useDispatch();
  const { blockedUsers, loading } = useSelector((state) => state.block);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    dispatch({ type: "FETCH_BLOCKED_USERS" });
  }, [dispatch]);

  const unblockUserHandler = (userId) => {
    swal({
      title: language === "en" ? "Are you sure?" : "هل أنت متأكد؟",
      text:
        language === "en"
          ? "This user will be unblocked!"
          : "سيتم إلغاء حظر هذا المستخدم!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willUnblock) => {
      if (willUnblock) {
        dispatch({ type: "UNBLOCK_USER", payload: userId });
      }
    });
  };

  if (loading) {
    return (
      <section className="flex flex-col md:flex-row">
        <AdminSidebar />
        <div className="flex-1 p-4 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col md:flex-row min-h-screen">
      <div className="md:w-64 flex-shrink-0">
        <AdminSidebar />
      </div>
      <div className="flex-1 p-4 bg-gray-50">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            {language === "en" ? "Blocked Users" : "المستخدمين المحظورين"}
          </h1>
          {blockedUsers.length === 0 ? (
            <div className="text-center py-8">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-3a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                {language === "en"
                  ? "No blocked users"
                  : "لا يوجد مستخدمين محظورين"}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {language === "en"
                  ? "There are no blocked users at the moment."
                  : "لا يوجد مستخدمين محظورين في الوقت الحالي."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === "en" ? "User" : "المستخدم"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === "en" ? "Blocked Date" : "تاريخ الحظر"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === "en" ? "Reason" : "السبب"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === "en" ? "Action" : "الإجراء"}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {blockedUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={
                              user.profilePhoto?.url || "/default-avatar.png"
                            }
                            alt={user.username}
                            className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.username}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(user.blockedAt).toLocaleDateString(
                            language === "en" ? "en-US" : "ar-SA",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs overflow-hidden">
                          {user.blockReason}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => unblockUserHandler(user._id)}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                        >
                          <svg
                            className="-ml-1 mr-2 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {language === "en" ? "Unblock User" : "إلغاء الحظر"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlockedUsersTable;
