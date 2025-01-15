import AdminSidebar from "./AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllMessages, deleteMessage } from "../../redux/apiCalls/messageApiCall";
import swal from "sweetalert";
import { LanguageContext } from "../../context/LanguageContext";
import { useContext } from "react";

const MessagesTable = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.message);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    dispatch(fetchAllMessages());
  }, [dispatch]);

  // Delete Message Handler
  const deleteMessageHandler = (messageId) => {
    swal({
      title: language === "en" ? "Are you sure?" : "هل أنت متأكد؟",
      text: language === "en" ? "Once deleted, you will not be able to recover this message!" : "بمجرد الحذف، لن تتمكن من استعادة هذه الرسالة!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteMessage(messageId));
      }
    });
  };

  return (
    <section className="flex flex-col md:flex-row">
      <AdminSidebar />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">{language === "en" ? "Messages" : "الرسائل"}</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">{language === "en" ? "Count" : "العدد"}</th>
                <th className="px-4 py-2 border-b">{language === "en" ? "User" : "المستخدم"}</th>
                <th className="px-4 py-2 border-b">{language === "en" ? "Message" : "الرسالة"}</th>
                <th className="px-4 py-2 border-b">{language === "en" ? "Action" : "الإجراء"}</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b text-center">{index + 1}</td>
                  <td className="px-4 py-2 border-b">{item.sender.username}</td>
                  <td className="px-4 py-2 border-b">{item.content}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => deleteMessageHandler(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      {language === "en" ? "Delete Message" : "حذف الرسالة"}
                    </button>
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

export default MessagesTable;