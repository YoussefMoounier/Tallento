import React, { useEffect, useState, useContext } from "react"; // Import useContext
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../redux/slices/projectSlice";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext"; // Import the context
import "./projList.css";

const ProjectsList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { projects, loading, error } = useSelector((state) => state.project);
  const { language } = useContext(LanguageContext); // Use context for language

  const [expandedProjectId, setExpandedProjectId] = useState(null);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  if (loading) return <p>{language === "en" ? "Loading projects..." : "جارٍ تحميل المشاريع..."}</p>;
  if (error) return <p>{error}</p>;

  // Ensure projects have a createdAt field and sort by it in descending order
  const sortedProjects = projects
    ? [...projects].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    : [];

  const toggleExpand = (projectId) => {
    if (expandedProjectId === projectId) {
      setExpandedProjectId(null);
    } else {
      setExpandedProjectId(projectId);
    }
  };

  return (
    <div className="project-list-container">
      <div className="project-list-header">
        <h2>{language === "en" ? "Open Projects" : "المشاريع المفتوحة"}</h2>
      </div>
      <div className="project-list-content">
        {sortedProjects.length > 0 ? (
          sortedProjects.map((project) => (
            <Link to={`/project/${project._id}`} key={project._id}>
              <div className="project-item">
                <div className="project-details">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">
                    {expandedProjectId === project._id
                      ? project.description // Show full description if expanded
                      : project.description.slice(0, 150) + "..."}
                  </p>
                  <p className="project-budget">
                    {language === "en" ? "Budget: " : "الميزانية: "} <strong>{project.budget} $</strong>
                  </p>
                  <p className="project-duration">
                    {language === "en" ? "Duration: " : "مدة التنفيذ: "} <strong>{project.duration} {language === "en" ? "days" : "أيام"}</strong>
                  </p>
                </div>

                {user ? (
                  <Link className="offer-button" to={`/project/${project._id}`}>
                    {language === "en" ? "Submit Offer" : "اضف عرضك"}
                  </Link>
                ) : (
                  <button className="offer-button" disabled>
                    {language === "en" ? "Submit Offer" : "اضف عرضك"}
                  </button>
                )}
              </div>
            </Link>
          ))
        ) : (
          <h3>{language === "en" ? "No projects available to display" : "لا يوجد مشاريع حالياً لعرضها"}</h3>
        )}
      </div>
      <div className="pagination">
        {/* Pagination buttons can be dynamically generated based on projects count */}
        {/* Example: */}
        {/* {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} className="page-button">{index + 1}</button>
        ))} */}
      </div>
    </div>
  );
};

export default ProjectsList;
