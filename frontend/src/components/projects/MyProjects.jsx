import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../redux/slices/projectSlice";
import { Link, useNavigate } from "react-router-dom";
import request from "../../utils/request";
import "./myProjects.css";
import { LanguageContext } from "../../context/LanguageContext";

const MyProjects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects, loading, error } = useSelector((state) => state.project);
  const user = useSelector((state) => state.auth.user);
  const { language } = useContext(LanguageContext);
console.log(language)
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

  if (loading)
    return (
      <p className="loading">
        {language === "en" ? "Loading projects..." : "جاري تحميل المشاريع..."}
      </p>
    );
  if (error) return <p className="error">{error}</p>;

  const userProjects = projects.filter(
    (project) => project.owner?._id === user._id
  );

  return (
    <div className="p-6 m-4 bg-white rounded-2xl flex flex-col items-center md:w-7/12 mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {language === "en" ? "My Projects" : "مشاريعي"}
      </h2>
      {userProjects.length === 0 ? (
        <div className="no-projects">
          <p>
            {language === "en" ? "You have no projects." : "ليس لديك مشاريع."}
          </p>
          <Link className="add-project-link" to="/add-project">
            {language === "en" ? "Add a new project" : "إضافة مشروع جديد"}
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-4 ">
          {userProjects.map((project) => (
            <li className="flex flex-col md:flex-row rounded-md p-2 bg-secodColor items-center justify-center h-full" key={project._id}>
              <Link to={`/edit-project/${project._id}`}>
                <div className="project--card">
                  <h3>{project.title}</h3>
                  <p className="h-16 text-white flex overflow-hidden">{project.description}</p>
                </div>
              </Link>
              <div className="flex md:flex-col justify-between h-full w-full">
                <button
                  onClick={() => navigate(`/edit-project/${project._id}`)}
                  className="bg-deepPurple md:mb-4 hover:opacity-80 text-white font-bold py-2 px-4 rounded"
                >
                  {language === "en" ? "Edit" : "تعديل"}
                </button>
                <button onClick={() => handleDelete(project._id)}
                  className="bg-deepPurple hover:opacity-80 text-white font-bold py-2 px-4 rounded">
                  {language === "en" ? "Delete" : "حذف"}
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
