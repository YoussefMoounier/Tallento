import AdminSidebar from "./AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllSkills, deleteSkill } from "../../redux/apiCalls/skillApiCall";
import swal from "sweetalert";
import { LanguageContext } from "../../context/LanguageContext";
import { useContext } from "react";
import AddSkillForm from './AddSkillForm';

const SkillsTable = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { skills } = useSelector((state) => state.skill || { skills: [] });
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        await dispatch(fetchAllSkills());
      } finally {
        setIsLoading(false);
      }
    };
    loadSkills();
  }, [dispatch]);

  // Delete Skill Handler
  const deleteSkillHandler = (skillId) => {
    swal({
      title: language === "en" ? "Are you sure?" : "هل أنت متأكد؟",
      text: language === "en" ? "Once deleted, you will not be able to recover this skill!" : "بمجرد الحذف، لن تتمكن من استعادة هذه المهارة!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteSkill(skillId));
      }
    });
  };

  if (isLoading) {
    return (
      <section className="flex flex-col md:flex-row">
        <AdminSidebar />
        <div className="flex-1 p-4 flex items-center justify-center">
          <div>Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col md:flex-row">
      <AdminSidebar />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">{language === "en" ? "Skills" : "المهارات"}</h1>
        
        <AddSkillForm onSkillAdded={() => dispatch(fetchAllSkills())} />

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">{language === "en" ? "Count" : "العدد"}</th>
                <th className="px-4 py-2 border-b">{language === "en" ? "Skill" : "المهارة"}</th>
                <th className="px-4 py-2 border-b">{language === "en" ? "Action" : "الإجراء"}</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(skills) && skills.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b text-center">{index + 1}</td>
                  <td className="px-4 py-2 border-b">{item.name}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => deleteSkillHandler(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      {language === "en" ? "Delete Skill" : "حذف المهارة"}
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

export default SkillsTable;