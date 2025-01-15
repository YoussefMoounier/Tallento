import img from "../../assets/tallento_app_default_image_with_custompink_fde4e4 (1).png";
import { useSelector } from "react-redux";
import React from "react";

export const PostCard = ({ project }) => {
  const defaultImageUrl = img;

  return (
    <div className="bg-customPink rounded-2xl w-80 h-96 p-4 mb-14 flex flex-col justify-between">
      <div className="flex w-full justify-between mb-4">
        <i className="bi bi-three-dots"></i>
        <img
          className="w-8 h-8 rounded-full"
          src={project?.owner?.profilePhoto?.url || "default_image_url"}
          alt={project?.owner?.username}
        />
      </div>
      <div className="w-full rounded-md overflow-hidden bg-gray-400 h-32">
        <img
          className="w-full h-full object-cover"
          src={project?.media?.url || defaultImageUrl}
          alt={project?.title}
        />
      </div>
      <h3 className="text-lg font-bold mt-2">{project?.title}</h3>
      <p className="text-sm text-gray-600 truncate">{project?.description}</p>
      <div className="flex justify-between mt-2">
        <span className="text-sm font-semibold">Budget: ${project?.budget}</span>
        <span className="text-sm font-semibold">
          Duration: {project?.duration} days
        </span>
      </div>
      <div className="flex flex-wrap mt-2">
        {project.skills.map((skill) => (
          <span
            key={skill}
            className="bg-gray-300 text-gray-700 text-xs font-semibold mr-1 px-2.5 py-0.5 rounded"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <div className="flex items-center">
          <i className="bi bi-bookmark" title="Save"></i>
        </div>
        <div className="flex justify-between mt-4 w-2/5">
          <div className="flex items-center">
            <i className="bi bi-heart" title="Like"></i>
          </div>
          <div className="flex items-center">
            <i className="bi bi-chat" title="Comment"></i>
          </div>
          <div className="flex items-center">
            <i className="bi bi-share" title="Share"></i>
          </div>
        </div>
      </div>
    </div>
  );
};
