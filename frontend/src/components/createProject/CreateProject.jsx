import React, { useContext } from "react"; // Import useContext
import "./creatProject.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setProjectField,
  setProjectSkills,
  createProject,
  clearError,
} from "../../redux/slices/projectSlice";
import SkillSelector from "../../SkillS";
import { LanguageContext } from "../../context/LanguageContext"; // Import the context
import { categories } from "../../utils/categories"; // Import categories

const CreateProject = () => {
  const dispatch = useDispatch();
  const { project, loading, error, isProjectCreated } = useSelector(
    (state) => state.project
  );
  const user = useSelector((state) => state.auth.user);
  const { language } = useContext(LanguageContext); // Use context for language

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setProjectField({ field: name, value }));
    dispatch(clearError());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectPayload = { ...project, ownerId: user._id };
    console.log("Submitting project payload:", projectPayload);
    dispatch(createProject(projectPayload));
  };

  return (
    <div className="w-full mx-auto flex flex-col gap-4 mt-8">
      <h2 className="font-bold mb-6">{language === "en" ? "Create New Project" : "إنشاء مشروع جديد"}</h2>
     <div className="flex md:flex-row flex-col gap-4 w-full p-4">

    
     
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full bg-white rounded-2xl p-4">
        <div className="flex w-full flex-col gap-4">
          <label htmlFor="title">
            {language === "en" ? "Project Title" : "عنوان المشروع"}
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={project.title}
            onChange={handleChange}
            required
            className="border-secodColor border-2 rounded-lg p-2 bg-white w-full"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="description">
            {language === "en" ? "Project Description" : "وصف المشروع"}
          </label>
          <textarea
            id="description"
            name="description"
            rows="5"
            value={project.description}
            onChange={handleChange}
            required
            className="border-secodColor border-2 rounded-lg p-2"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="category">
            {language === "en" ? "Category" : "الفئة"}
          </label>
          <select
            id="category"
            name="category"
            value={project.category}
            onChange={handleChange}
            required
            className="border-secodColor border-2 rounded-lg p-2"
          >
            <option value="" >
              {language === "en" ? "Select Category" : "اختر الفئة"}
            </option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {language === "en" ? category.label.en : category.label.ar}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="status">
            {language === "en" ? "Project Status" : "حالة المشروع"}
          </label>
          <select
            id="status"
            name="status"
            value={project.status}
            onChange={handleChange}
            className="border-secodColor border-2 rounded-lg p-2"
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
        <div className="flex flex-col gap-4">
          <label htmlFor="budget">
            {language === "en" ? "Budget" : "الميزانية"}
          </label>
          <select
            id="budget"
            name="budget"
            value={project.budget}
            onChange={handleChange}
            required
            className="border-secodColor border-2 rounded-lg p-2"
          >
            <option value="">
              {language === "en" ? "Select Budget" : "اختر الميزانية"}
            </option>
            <option value="50">
              25-50 {language === "en" ? "USD" : "دولار"}
            </option>
            <option value="100">
              50-100 {language === "en" ? "USD" : "دولار"}
            </option>
            <option value="250">
              100-250 {language === "en" ? "USD" : "دولار"}
            </option>
            <option value="500">
              250-500 {language === "en" ? "USD" : "دولار"}
            </option>
            <option value="1000">
              500-1000 {language === "en" ? "USD" : "دولار"}
            </option>
            <option value="2500">
              1000-2500 {language === "en" ? "USD" : "دولار"}
            </option>
            <option value="5000">
              2500-5000 {language === "en" ? "USD" : "دولار"}
            </option>
            <option value="10000">
              5000-10000 {language === "en" ? "USD" : "دولار"}
            </option>
          </select>
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="duration">
            {language === "en" ? "Duration (in days)" : "مدة التنفيذ (بالأيام)"}
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={project.duration}
            onChange={handleChange}
            required
            className="border-secodColor border-2 rounded-lg p-2"
          />
        </div>
        
        <div className="w-full flex items-center justify-center">
          <button type="submit" className=" bg-secodColor text-white rounded-2xl py-1  px-48">
            {language === "en" ? "Create Project" : "إنشاء مشروع"}
          </button>
        </div>
      </form>
      <SkillSelector
          selectedSkills={project.skills}
          onSkillChange={(skills) => dispatch(setProjectSkills({ skills }))}
        />
         </div>
    </div>
  );
};

export default CreateProject;
