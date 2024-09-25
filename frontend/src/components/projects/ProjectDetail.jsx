import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchProjects } from "../../redux/slices/projectSlice";
import "./ProjectDetail.css";
import request from "../../utils/request";
import ProjectCard from "./projectCard/ProjectCard";

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
            قدم عرضك الآن
          </button>
        </div>
        <div className="project-info">
          <div className="project-info-left">
            <h3>تفاصيل المشروع</h3>
            <p>
              <strong>حالة المشروع:</strong> {project.status}
            </p>
            <p>
              <strong>الميزانية:</strong> {project.budget}
            </p>
            <p>
              <strong>مدة التنفيذ:</strong> {project.duration} أيام
            </p>
            <p>
              <strong>عدد العروض:</strong> {project.offers.length}
            </p>
          </div>
          <div className="project-info-right">
            <h3>وصف المشروع</h3>
            <p>{project.description}</p>
            <h3>المهارات المطلوبة</h3>
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
          <h3>العروض المقدمة</h3>
          {project.offers.map((offer, index) => (
            <div key={index} className="offer">
              <p>
                <strong>Amount:</strong> {offer.amount}
              </p>
              <p>
                <strong>Duration:</strong> {offer.duration} أيام
              </p>
              <p>
                <strong>Description:</strong> {offer.description}
              </p>
            </div>
          ))}
        </div>
        <div className="offer-form-container" id="offer-form">
          <h3>قدم عرضك الآن</h3>
          <form onSubmit={handleSubmit} className="offer-form">
            <div>
              <div>
                <label htmlFor="amount">قيمة العرض</label>
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
                <strong>Fee (10%):</strong> {fee} $
              </p>
            </div>
            <div>
              <label htmlFor="duration">مدة التسليم</label>
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
              <label htmlFor="description">تفاصيل العرض</label>
              <textarea
                id="description"
                name="description"
                value={offer.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit">أضف عرضك</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
