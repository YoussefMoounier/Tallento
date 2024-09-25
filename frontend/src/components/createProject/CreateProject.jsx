import React from "react";
import "./creatProject.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setProjectField,
  setProjectSkills,
  createProject,
  clearError,
} from "../../redux/slices/projectSlice";
import SkillSelector from "../../SkillS";

const CreateProject = () => {
  const dispatch = useDispatch();
  const { project, loading, error, isProjectCreated } = useSelector(
    (state) => state.project
  );
  const user = useSelector((state) => state.auth.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setProjectField({ field: name, value }));
    dispatch(clearError());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectPayload = { ...project, ownerId: user._id };
    console.log("Submitting project payload:", project);
    dispatch(createProject(projectPayload));
  };

  return (
    <div className="project-form-container">
      <h2>إنشاء مشروع جديد</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">عنوان المشروع</label>
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
          <label htmlFor="description">وصف المشروع</label>
          <textarea
            id="description"
            name="description"
            value={project.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">حالة المشروع</label>
          <select
            id="status"
            name="status"
            value={project.status}
            onChange={handleChange}
          >
            <option value="مفتوح">مفتوح</option>
            <option value="مغلق">مغلق</option>
            <option value="قيد التنفيذ">قيد التنفيذ</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="budget">الميزانية</label>
          <select
            id="budget"
            name="budget"
            value={project.budget}
            onChange={handleChange}
            required
          >
            <option value="">اختر الميزانية</option>
            <option value="50">25-50 دولار</option>
            <option value="100">50-100 دولار</option>
            <option value="250">100-250 دولار</option>
            <option value="500">250-500 دولار</option>
            <option value="1000">500-1000 دولار</option>
            <option value="2500">1000-2500 دولار</option>
            <option value="5000">2500-5000 دولار</option>
            <option value="10000">5000-10000 دولار</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="duration">مدة التنفيذ (بالأيام)</label>
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
          <button type="submit">إنشاء مشروع</button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
