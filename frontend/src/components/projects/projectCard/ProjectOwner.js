import React, { useContext } from "react"; // Import useContext
import { LanguageContext } from "../../../context/LanguageContext"; // Import the context

const ProjectOwner = ({ owner }) => {
  const { language } = useContext(LanguageContext); // Use context for language

  return (
    <div className="project-owner">
      <div className="owner">
        <h3>{language === "en" ? "Project Owner" : "صاحب المشروع"}</h3>
        <p>{owner?.username}</p>
        <img src={owner?.profilePhoto?.url} alt="" />
      </div>
      <p>
        {language === "en" ? "Registration Date:" : "تاريخ التسجيل:"} {new Date(owner?.createdAt).toLocaleDateString()}
      </p>
      <p>
        {language === "en" ? "Employment Rate:" : "معدل التوظيف:"}{" "}
        {owner?.employmentRate ? owner?.employmentRate : (language === "en" ? "Not calculated yet" : "لم يحسب بعد")}
      </p>
      <p>
        {language === "en" ? "Open Projects:" : "المشاريع المفتوحة:"} {owner?.openProjects}
      </p>
      <p>
        {language === "en" ? "Ongoing Projects:" : "مشاريع قيد التنفيذ:"} {owner?.ongoingProjects}
      </p>
    </div>
  );
};

export default ProjectOwner;
