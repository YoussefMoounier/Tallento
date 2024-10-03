import React, { useEffect, useState, useContext } from "react"; // Import useContext
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchProjects } from "../../redux/slices/projectSlice";
import "./ProjectDetail.css";
import request from "../../utils/request";
import ProjectCard from "./projectCard/ProjectCard";
import { LanguageContext } from "../../context/LanguageContext"; // Import the context

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [offer, setOffer] = useState({
    amount: "",
    duration: "",
    description: "",
  });

  const { user } = useSelector((state) => state.auth);
  const userId = user._id;

  const dispatch = useDispatch();
  const { projects, error } = useSelector((state) => state.project);
  const { language } = useContext(LanguageContext); // Use context for language

  useEffect(() => {
    if (projects.length === 0) {
      dispatch(fetchProjects());
    } else {
      const selectedProject = projects.find((p) => p._id === id);
      setProject(selectedProject);
    }
  }, [dispatch, projects, id]);

  useEffect(() => {
    if (projects.length > 0) {
      const selectedProject = projects.find((p) => p._id === id);
      setProject(selectedProject);
    }
  }, [projects, id]);

  const handleChange = (e) => {
    setOffer({ ...offer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await request.post(`/api/projects/${id}/offers`, {
        userId,
        ...offer,
      });
      setProject(response.data);
      setOffer({ amount: "", duration: "", description: "" });
    } catch (error) {
      console.error("Error submitting offer:", error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!project) {
    return <div>Loading...</div>;
  }

  const fee = offer.amount ? (offer.amount * 0.1).toFixed(2) : "0.00";

  return (
    <>
      <ProjectCard
        project={project}
        offer={offer}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <div className="project-detail-container">
        <div className="project-summary">
          <h2>{project.title}</h2>
          <button
            className="offer-button"
            onClick={() =>
              document.getElementById("offer-form").scrollIntoView()
            }
          >
            {language === "en" ? "Submit Your Offer Now" : "قدم عرضك الآن"}
          </button>
        </div>
        <div className="project-info">
          <div className="project-info-left">
            <h3>{language === "en" ? "Project Details" : "تفاصيل المشروع"}</h3>
            <p>
              <strong>{language === "en" ? "Project Status:" : "حالة المشروع:"}</strong> {project.status}
            </p>
            <p>
              <strong>{language === "en" ? "Budget:" : "الميزانية:"}</strong> {project.budget}
            </p>
            <p>
              <strong>{language === "en" ? "Duration:" : "مدة التنفيذ:"}</strong> {project.duration} {language === "en" ? "days" : "أيام"}
            </p>
            <p>
              <strong>{language === "en" ? "Number of Offers:" : "عدد العروض:"}</strong> {project.offers.length}
            </p>
          </div>
          <div className="project-info-right">
            <h3>{language === "en" ? "Project Description" : "وصف المشروع"}</h3>
            <p>{project.description}</p>
            <h3>{language === "en" ? "Required Skills" : "المهارات المطلوبة"}</h3>
            <div className="skills">
              {project.skills.map((skill, index) => (
                <span key={index} className="skill">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="project-offers">
          <h3>{language === "en" ? "Submitted Offers" : "العروض المقدمة"}</h3>
          {project.offers.map((offer, index) => (
            <div key={index} className="offer">
              <p>
                <strong>{language === "en" ? "Amount:" : "قيمة العرض:"}</strong> {offer.amount}
              </p>
              <p>
                <strong>{language === "en" ? "Duration:" : "مدة التسليم:"}</strong> {offer.duration} {language === "en" ? "days" : "أيام"}
              </p>
              <p>
                <strong>{language === "en" ? "Description:" : "تفاصيل العرض:"}</strong> {offer.description}
              </p>
            </div>
          ))}
        </div>
        <div className="offer-form-container" id="offer-form">
          <h3>{language === "en" ? "Submit Your Offer Now" : "قدم عرضك الآن"}</h3>
          <form onSubmit={handleSubmit} className="offer-form">
            <div>
              <div>
                <label htmlFor="amount">{language === "en" ? "Offer Amount" : "قيمة العرض"}</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={offer.amount}
                  onChange={handleChange}
                  required
                />
              </div>
              <p>
                <strong>{language === "en" ? "Fee (10%):" : "الرسوم (10%):"}</strong> {fee} $
              </p>
            </div>
            <div>
              <label htmlFor="duration">{language === "en" ? "Delivery Duration" : "مدة التسليم"}</label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={offer.duration}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="description">{language === "en" ? "Offer Details" : "تفاصيل العرض"}</label>
              <textarea
                id="description"
                name="description"
                value={offer.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit">{language === "en" ? "Add Your Offer" : "أضف عرضك"}</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
```
</rewritten_file>