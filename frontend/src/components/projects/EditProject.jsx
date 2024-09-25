import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, updateProject } from "../../redux/slices/projectSlice";
import { useParams, useNavigate } from "react-router-dom";
import "./EditProject.css"; // Import the CSS file

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
      alert("لا يوجد عرض مقابل لهذا المشرف");
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
    return <p className="edit-project-loading">Loading project...</p>;
  if (error) return <p className="edit-project-error">{error}</p>;

  return (
    <div className="edit-project-container">
      <h2 className="edit-project-title">Edit Project</h2>
      <form className="edit-project-form" onSubmit={handleSubmit}>
        <div>
          <label className="edit-project-label">Title</label>
          <input
            type="text"
            name="title"
            value={projectData.title}
            onChange={handleChange}
            className="edit-project-input"
            required
          />
        </div>
        <div>
          <label className="edit-project-label">Description</label>
          <textarea
            name="description"
            value={projectData.description}
            onChange={handleChange}
            className="edit-project-textarea"
            required
          ></textarea>
        </div>
        <div>
          <label className="edit-project-label">Status</label>
          <select
            name="status"
            value={projectData.status}
            onChange={handleChange}
            className="edit-project-select"
          >
            <option value="مفتوح">مفتوح</option>
            <option value="مغلق">مغلق</option>
            <option value="قيد التنفيذ">قيد التنفيذ</option>
          </select>
        </div>
        {projectData.status === "قيد التنفيذ" && (
          <div>
            <label className="edit-project-label">Editor</label>
            <select
              name="editor"
              value={projectData.editor}
              onChange={handleEditorChange}
              className="edit-project-select"
              required
            >
              <option value="">Select Editor</option>
              {users?.map((user) => (
                <option key={user?._id} value={user?._id}>
                  {user?.username}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label className="edit-project-label">Budget</label>
          <input
            type="text"
            name="budget"
            value={projectData.budget}
            onChange={handleChange}
            className="edit-project-input"
            required
          />
        </div>
        <div>
          <label className="edit-project-label">Duration</label>
          <input
            type="number"
            name="duration"
            value={projectData.duration}
            onChange={handleChange}
            className="edit-project-input"
            required
          />
        </div>
        <div>
          <label className="edit-project-label">Skills</label>
          <input
            type="text"
            name="skills"
            value={projectData.skills.join(", ")}
            onChange={handleSkillsChange}
            className="edit-project-input"
            required
          />
        </div>
        <div>
          <button type="submit" className="edit-project-button">
            Update Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProject;
