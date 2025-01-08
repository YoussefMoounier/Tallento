import React, { useEffect, useState, useContext } from "react"; // Import useContext
import { LanguageContext } from "../../../context/LanguageContext"; // Import the context

const ProjectDetails = ({ project }) => {
  const [averageBid, setAverageBid] = useState(0);
  const { language } = useContext(LanguageContext); // Use context for language

  // Define the status color mapping
  const statusColorMap = {
    مفتوح: "bg-secodColor", // Color for "Open"
    مغلق: "bg-deepPurple", // Color for "Closed"
    "قيد التنفيذ": "bg-brown", // Color for "In Progress"
  };

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
    <div className="">
     <p>
        {language === "en" ? "Project Status:" : "حالة المشروع:"}{" "}
        <span className={`status ${statusColorMap[project.status]} px-2 py-1 rounded-2xl text-white`}>
          {project.status}
        </span>
      </p>
      <p>
        {language === "en" ? "Publish Date:" : "تاريخ النشر:"}{" "}
        {new Date(project.publishDate).toLocaleString()}
      </p>
      <p>
        {language === "en" ? "Budget:" : "الميزانية:"} ${project.budget}
      </p>
      <p>
        {language === "en" ? "Duration:" : "مدة التنفيذ:"} {project.duration}{" "}
        {language === "en" ? "days" : "أيام"}
      </p>
      <p>
        {language === "en" ? "Average Bid:" : "متوسط العروض:"} ${averageBid}
      </p>
      <p>
        {language === "en" ? "Number of Offers:" : "عدد العروض:"}{" "}
        {project.offers.length}
      </p>
    </div>
  );
};

export default ProjectDetails;
