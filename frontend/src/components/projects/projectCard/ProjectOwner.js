import React from "react";

const ProjectOwner = ({ owner }) => {
  
  return (
    <div className="project-owner">
      <div className="owner">
        <h3>صاحب المشروع</h3>
        <p>{owner?.username}</p>
        <img src={owner?.profilePhoto?.url} alt="" />
      </div>
      <p>تاريخ التسجيل: {new Date(owner?.createdAt).toLocaleDateString()}</p>
      <p>
        معدل التوظيف:{" "}
        {owner?.employmentRate ? owner?.employmentRate : "لم يحسب بعد"}
      </p>
      <p>المشاريع المفتوحة: {owner?.openProjects}</p>
      <p>مشاريع قيد التنفيذ: {owner?.ongoingProjects}</p>
    </div>
  );
};

export default ProjectOwner;
