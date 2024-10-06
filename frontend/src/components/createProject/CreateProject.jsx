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

const CreateProject = () => {
  const dispatch = useDispatch();
  const { project, loading, error, isProjectCreated } = useSelector(
    (state) => state.project
  );
  const user = useSelector((state) => state.auth.user);
  const { language } = useContext(LanguageContext); // Use context for language

  // Define categories
  const categories = [
    { value: "development", label: language === "en" ? "Development" : "برمجة" },
    { value: "design", label: language === "en" ? "Design" : "تصميم" },
    { value: "marketing", label: language === "en" ? "Marketing" : "تسويق" },
    { value: "writing", label: language === "en" ? "Writing" : "كتابة" },
    { value: "Voice", label: language === "en" ? "Voice Over" : "تعليق صوتي" },
    { value: "other", label: language === "en" ? "Other" : "أخرى" },
  ];

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
    <div className="project-form-container">
      <h2>{language === "en" ? "Create New Project" : "إنشاء مشروع جديد"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">{language === "en" ? "Project Title" : "عنوان المشروع"}</label>
          <input
            type="text"
            id="title"
            name="title"
            value={project.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group description-feild">
          <label htmlFor="description">{language === "en" ? "Project Description" : "وصف المشروع"}</label>
          <textarea
            id="description"
            name="description"
            value={project.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">{language === "en" ? "Category" : "الفئة"}</label>
          <select
            id="category"
            name="category"
            value={project.category}
            onChange={handleChange}
            required
          >
            <option value="">{language === "en" ? "Select Category" : "اختر الفئة"}</option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="status">{language === "en" ? "Project Status" : "حالة المشروع"}</label>
          <select
            id="status"
            name="status"
            value={project.status}
            onChange={handleChange}
          >
            <option value="مفتوح">{language === "en" ? "Open" : "مفتوح"}</option>
            <option value="مغلق">{language === "en" ? "Closed" : "مغلق"}</option>
            <option value="قيد التنفيذ">{language === "en" ? "In Progress" : "قيد التنفيذ"}</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="budget">{language === "en" ? "Budget" : "الميزانية"}</label>
          <select
            id="budget"
            name="budget"
            value={project.budget}
            onChange={handleChange}
            required
          >
            <option value="">{language === "en" ? "Select Budget" : "اختر الميزانية"}</option>
            <option value="50">25-50 {language === "en" ? "USD" : "دولار"}</option>
            <option value="100">50-100 {language === "en" ? "USD" : "دولار"}</option>
            <option value="250">100-250 {language === "en" ? "USD" : "دولار"}</option>
            <option value="500">250-500 {language === "en" ? "USD" : "دولار"}</option>
            <option value="1000">500-1000 {language === "en" ? "USD" : "دولار"}</option>
            <option value="2500">1000-2500 {language === "en" ? "USD" : "دولار"}</option>
            <option value="5000">2500-5000 {language === "en" ? "USD" : "دولار"}</option>
            <option value="10000">5000-10000 {language === "en" ? "USD" : "دولار"}</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="duration">{language === "en" ? "Duration (in days)" : "مدة التنفيذ (بالأيام)"}</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={project.duration}
            onChange={handleChange}
            required
          />
        </div>
        <SkillSelector
          selectedSkills={project.skills}
          onSkillChange={(skills) => dispatch(setProjectSkills({ skills }))}
        />
        <div className="form-group">
          <button type="submit">{language === "en" ? "Create Project" : "إنشاء مشروع"}</button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;