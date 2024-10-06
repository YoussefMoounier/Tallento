import React, { useEffect, useState, useContext } from "react"; // Import useContext
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../redux/slices/projectSlice";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext"; // Import the context
import { categories } from "../../utils/categories"; // Import categories
import "./projList.css";

const ProjectsList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { projects, loading, error } = useSelector((state) => state.project);
  const { language } = useContext(LanguageContext); // Use context for language

  const [expandedProjectId, setExpandedProjectId] = useState(null);
  const [sortCriteria, setSortCriteria] = useState("createdAt"); // Default sorting by creation date
  const [selectedCategories, setSelectedCategories] = useState([]); // State for selected categories

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  if (loading) return <p>{language === "en" ? "Loading projects..." : "جارٍ تحميل المشاريع..."}</p>;
  if (error) return <p>{error}</p>;

  // Filter projects based on selected categories
  const filteredProjects = selectedCategories.length > 0
    ? projects.filter(project => selectedCategories.includes(project.category))
    : projects;

  // Ensure projects have a createdAt field and sort by it based on selected criteria
  const sortedProjects = filteredProjects
    ? [...filteredProjects].sort((a, b) => {
        if (sortCriteria === "createdAt") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        } else if (sortCriteria === "title") {
          return a.title.localeCompare(b.title);
        } else if (sortCriteria === "budget") {
          return b.budget - a.budget; // Assuming budget is a number
        } else if (sortCriteria === "duration") {
          return b.duration - a.duration; // Assuming duration is a number
        }
        return 0; // Default case
      })
    : [];

  const toggleExpand = (projectId) => {
    if (expandedProjectId === projectId) {
      setExpandedProjectId(null);
    } else {
      setExpandedProjectId(projectId);
    }
  };

  // Handle category checkbox change
  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  return (
    <div className="project-list-container">
      <div className="category-filter">
        <h3>{language === "en" ? "Filter by Category" : "تصفية حسب الفئة"}</h3>
        {categories.map(category => (
          <div key={category.value}>
            <label>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.value)}
                onChange={() => handleCategoryChange(category.value)}
              />
              {language === "en" ? category.label.en : category.label.ar}
            </label>
          </div>
        ))}
      </div>
      <div className="project-list-content">
        <div className="project-list-header">
          <h2>{language === "en" ? "Open Projects" : "المشاريع المفتوحة"}</h2>
          <div className="sort-options">
            <label>{language === "en" ? "Sort by:" : "ترتيب حسب:"}</label>
            <select onChange={(e) => setSortCriteria(e.target.value)} value={sortCriteria}>
              <option value="createdAt">{language === "en" ? "Date Created" : "تاريخ الإنشاء"}</option>
              <option value="title">{language === "en" ? "Title" : "العنوان"}</option>
              <option value="budget">{language === "en" ? "Budget" : "الميزانية"}</option>
              <option value="duration">{language === "en" ? "Duration" : "مدة التنفيذ"}</option>
            </select>
          </div>
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
                        : project.description.slice(0, 150) + "..." }
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