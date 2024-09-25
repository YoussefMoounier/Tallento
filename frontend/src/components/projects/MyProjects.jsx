import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../redux/slices/projectSlice";
import { Link, useNavigate } from "react-router-dom";
import request from "../../utils/request";
import "./myProjects.css";

const MyProjects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects, loading, error } = useSelector((state) => state.project);
  const user = useSelector((state) => state.auth.user);
 

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (confirmDelete) {
      try {
        await request.delete(`/api/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`, // Add authorization header if required
          },
        });
        dispatch(fetchProjects());
      } catch (error) {
        console.error(
          "There was an error deleting the project:",
          error.response || error.message
        );
      }
    }
  };

  if (loading) return <p className="loading">Loading projects...</p>;
  if (error) return <p className="error">{error}</p>;

  const userProjects = projects.filter((project) => project.owner?._id === user._id);

  return (
    <div className="my-project-container">
      <h2>My Projects</h2>
      {userProjects.length === 0 ? (
        <div className="no-projects">
          <p>You have no projects.</p>
          <Link className="add-project-link" to="/add-project">
            Add a new project
          </Link>
        </div>
      ) : (
        <ul className="proj-list">
          {userProjects.map((project) => (
            <li className="proj-item" key={project._id}>
              <Link to={`/edit-project/${project._id}`}>
                <div className="project--card">
                 <h3>{project.title}</h3> 
                 <p>{project.description}</p>
                  
                </div>
              </Link>
              <div className="my-project-edit-del-btns">
                <button
                  onClick={() => navigate(`/edit-project/${project._id}`)}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(project._id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyProjects;
