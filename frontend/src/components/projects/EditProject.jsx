import React, { useState, useEffect, useContext } from "react"; // Import useContext
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, updateProject } from "../../redux/slices/projectSlice";
import { useParams, useNavigate } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext"; 

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((state) => state.project);
  const [users, setUsers] = useState([]);

  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    status: "مفتوح",
    budget: "",
    duration: 0,
    skills: [],
    offers: [],
    editor: "", // Added editor field
  });

  const { language } = useContext(LanguageContext); // Use context for language

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    const project = projects.find((proj) => proj?._id === id);
    if (project) {
      setProjectData(project);
      const users = project?.offers?.map((off) => off.user);
      setUsers(users);
    }
  }, [projects, id]);

  const handleEditorChange = (e) => {
    const editorId = e.target.value;
    const selectedOffer = projectData.offers.find(
      (offer) => offer.user._id === editorId
    );

    if (selectedOffer) {
      const newBudget = selectedOffer.amount;
      setProjectData((prevData) => ({
        ...prevData,
        editor: editorId,
        budget: newBudget,
      }));
    } else {
      alert(
        language === "en"
          ? "No offer found for this editor"
          : "لا يوجد عرض مقابل لهذا المشرف"
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSkillsChange = (e) => {
    const { value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      skills: value.split(",").map((skill) => skill.trim()),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProject({ id, projectData }));
    navigate("/my-projects");
  };

  if (loading)
    return (
      <p className="edit-project-loading">
        {language === "en" ? "Loading project..." : "جارٍ تحميل المشروع..."}
      </p>
    );
  if (error) return <p className="edit-project-error">{error}</p>;

  return (
    <div className="m-6 p-4 flex flex-col items-center gap-8">
      <h2 className="font-bold text-deepPurple text-3xl">
        {language === "en" ? "Edit Project" : "تعديل المشروع"}
      </h2>
      <form className="bg-white flex flex-col mx-auto rounded-xl md:w-4/6 p-6" onSubmit={handleSubmit}>
        <div>
          <label className="font-bold">
            {language === "en" ? "Title" : "العنوان"}
          </label>
          <input
            type="text"
            name="title"
            value={projectData.title}
            onChange={handleChange}
            className="edit-project-input border-secodColor border-2 rounded-xl p-2 w-full "
            required
          />
        </div>
        <div>
          <label className="font-bold">
            {language === "en" ? "Description" : "الوصف"}
          </label>
          <textarea
            name="description"
            value={projectData.description}
            onChange={handleChange}
            rows="6"
            className="edit-project-textarea border-secodColor border-2 rounded-xl p-2 w-full "
            required
          ></textarea>
        </div>
        <div>
          <label className="font-bold">
            {language === "en" ? "Status" : "الحالة"}
          </label>
          <select
            name="status"
            value={projectData.status}
            onChange={handleChange}
            className="edit-project-select border-secodColor border-2 rounded-xl p-2 w-full "
          >
            <option value="مفتوح">
              {language === "en" ? "Open" : "مفتوح"}
            </option>
            <option value="مغلق">
              {language === "en" ? "Closed" : "مغلق"}
            </option>
            <option value="قيد التنفيذ">
              {language === "en" ? "In Progress" : "قيد التنفيذ"}
            </option>
          </select>
        </div>
        {projectData.status === "قيد التنفيذ" && (
          <div>
            <label className="font-bold">
              {language === "en" ? "Editor" : "المشرف"}
            </label>
            <select
              name="editor"
              value={projectData.editor}
              onChange={handleEditorChange}
              className="edit-project-select border-secodColor border-2 rounded-xl p-2 w-full "
              required
            >
              <option value="">
                {language === "en" ? "Select Editor" : "اختر المشرف"}
              </option>
              {users?.map((user) => (
                <option key={user?._id} value={user?._id}>
                  {user?.username}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label className="font-bold">
            {language === "en" ? "Budget" : "الميزانية"}
          </label>
          <input
            type="text"
            name="budget"
            value={projectData.budget}
            onChange={handleChange}
            className="edit-project-input border-secodColor border-2 rounded-xl p-2 w-full "
            required
          />
        </div>
        <div>
          <label className="font-bold">
            {language === "en" ? "Duration" : "مدة التنفيذ"}
          </label>
          <input
            type="number"
            name="duration"
            value={projectData.duration}
            onChange={handleChange}
            className="edit-project-input border-secodColor border-2 rounded-xl p-2 w-full "
            required
          />
        </div>
        <div>
          <label className="font-bold">
            {language === "en" ? "Skills" : "المهارات"}
          </label>
          <input
            type="text"
            name="skills"
            value={projectData.skills.join(", ")}
            onChange={handleSkillsChange}
            className="edit-project-input border-secodColor border-2 rounded-xl p-2 w-full "
            required
          />
        </div>
        <div className="flex flex-col">
          <button type="submit" className="px-12 py-1 self-center mt-4 bg-secodColor rounded-full">
            {language === "en" ? "Update Project" : "تحديث المشروع"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProject;
