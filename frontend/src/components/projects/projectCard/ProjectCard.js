import React, { useEffect, useState } from "react";
import ProjectDetails from "./ProjectDetails";
import ProjectOwner from "./ProjectOwner";
import ProjectShare from "./ProjectShare";
import BidForm from "./BidForm";
import "./ProjectCard.css";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjects,
  updateProject,
} from "../../../redux/slices/projectSlice";
import request from "../../../utils/request";
import LoadingSpinner from "../../isLoading/LoadingSpinner";

const ProjectCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [editor, setEditor] = useState(null);
  const [offer, setOffer] = useState({
    amount: "",
    duration: "",
    description: "",
  });

  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;

  const dispatch = useDispatch();
  const { projects, error } = useSelector((state) => state.project);

  const findEditor = (edit) => {
    const editorObject = project?.offers?.find(
      (offer) => offer.user?._id === edit
    );
    setEditor(editorObject);
  };

  useEffect(() => {
    if (projects.length === 0) {
      dispatch(fetchProjects());
    } else {
      const selectedProject = projects.find((p) => p._id === id);
      findEditor(selectedProject.editor);
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
    if (user) {
      // Check if the user has already made an offer
      const existingOffer = project.offers.find(
        (offer) => offer.user._id === userId
      );
      if (existingOffer) {
        alert("You have already made an offer on this project.");
        return;
      }

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
    }
  };

  const handleImageClick = async (offerOwnerId) => {
    try {
      navigate(`/profile/${offerOwnerId}`);
    } catch (error) {
      console.error("Error handling image click:", error.message);
    }
  };

  const handleAcceptOffer = async (offerId, offerOwnerId, totalPrice) => {
    try {
      const projectData = {
        status: "قيد التنفيذ",
        editor: offerOwnerId,
        ownerId: userId,
        offerId: offerId,
      };

      navigate("/checkout", {
        state: {
          offerAmount: totalPrice,
          projectId: id,
          offerId,
        },
      });
    } catch (error) {
      console.error("Error accepting offer:", error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!project) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  const userCanComment =
    userId &&
    userId !== project?.owner?._id &&
    !project.offers.some((offer) => offer?.user?._id === userId);

  // Convert the FEE to a number
  const feePercentage = parseFloat(process.env.REACT_APP_FEE) || 0.1;

  return (
    <div className="project-card">
      <div className="project-details-section">
        <ProjectDetails project={project} />
        <ProjectOwner owner={project.owner} />
      </div>
      <div className="project-description">
        <h2>وصف المشروع</h2>
        <p>{project.description}</p>
      </div>
      <div className="project-skills">
        <h2>المهارات المطلوبة</h2>
        <div className="skills">
          {project.skills.map((skill, index) => (
            <span key={index}>{skill}</span>
          ))}
        </div>
      </div>
      {project.status === "قيد التنفيذ" && (
        <div className="project-editor">
          <p>المشرف: {editor?.user.username}</p>
          <img
            src={editor?.user.profilePhoto?.url}
            alt={editor?.user.username}
            className="owner-image"
          />
          <p>
            تاريخ التسجيل:{" "}
            {new Date(project.editor.createdAt).toLocaleDateString()}
          </p>
        </div>
      )}

      {userCanComment && (
        <BidForm
          offer={offer}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
      <div className="project-offers">
        <h3>العروض المقدمة</h3>
        {project.offers.map((offer, index) => {
          // Calculate the fee and total price
          const fee = (offer.amount * feePercentage).toFixed(2);
          const totalPrice = (
            parseFloat(offer.amount) + parseFloat(fee)
          ).toFixed(2);

          return (
            <div key={index} className="offer">
              {(userId === offer.user?._id || userId === project.owner?._id) && (
                <>
                  <p>
                    <strong>السعر:</strong> {offer.amount}$
                  </p>
                  <p>
                    <strong>العمولة (10%):</strong> {fee}$
                  </p>
                  <p>
                    <strong>المبلغ الإجمالي للدفع:</strong> {totalPrice}$
                  </p>
                  <p>
                    <strong>مدة التنفيذ:</strong> {offer.duration} أيام
                  </p>
                </>
              )}
              <p>
                <strong>تفاصيل العرض:</strong> {offer.description}
              </p>
              <div className="offer-owner">
                <p>{offer?.user?.username}</p>
                <img
                  src={offer.user?.profilePhoto?.url}
                  alt={offer.user?.username}
                  onClick={() => handleImageClick(offer.user?._id)}
                  className="owner-image"
                />
              </div>
              {userId === project.owner?._id && (
                <button
                  className="btn accept-btn"
                  onClick={() =>
                    handleAcceptOffer(offer?._id, offer.user?._id, totalPrice)
                  }
                >
                  قبول العرض
                </button>
              )}
            </div>
          );
        })}
      </div>
      <ProjectShare />
    </div>
  );
};

export default ProjectCard;
