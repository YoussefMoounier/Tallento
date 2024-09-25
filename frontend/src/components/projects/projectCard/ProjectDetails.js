import React, { useEffect, useState } from "react";

const ProjectDetails = ({ project }) => {
  const [averageBid, setAverageBid] = useState(0);

  useEffect(() => {
    if (project.offers.length > 0) {
      const totalBids = project.offers.reduce((total, offer) => {
        return total + offer.amount;
      }, 0);

      setAverageBid((totalBids / project.offers.length).toFixed(2));
    } else {
      setAverageBid(0);
    }
  }, [project.offers]);

  return (
    <div className="project-details">
      <h3>بطاقة المشروع</h3>
      <p>
        حالة المشروع:{" "}
        <span className={`status-${project.status.toLowerCase()}`}>
          {project.status}
        </span>
      </p>
      <p>تاريخ النشر: {new Date(project.publishDate).toLocaleString()}</p>
      <p>الميزانية: ${project.budget}</p>
      <p>مدة التنفيذ: {project.duration} أيام</p>
      <p>متوسط العروض: ${averageBid}</p>
      <p>عدد العروض: {project.offers.length}</p>
    </div>
  );
};

export default ProjectDetails;
