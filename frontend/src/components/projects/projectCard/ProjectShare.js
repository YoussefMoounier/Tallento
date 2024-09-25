import React, { useEffect, useState } from "react";

const ProjectShare = () => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handleShare = (platform) => {
    const encodedUrl = encodeURIComponent(url);
    let shareUrl = "";
    switch (platform) {
      case "LinkedIn":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "Facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "Twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}`;
        break;
      default:
        break;
    }
    window.open(shareUrl, "_blank");
  };

  return (
    <div className="project-share">
      <h3>شارك المشروع</h3>
      <input type="text" value={url} readOnly />
      <div className="share-buttons">
        <button onClick={() => handleShare("LinkedIn")}>LinkedIn</button>
        <button onClick={() => handleShare("Facebook")}>Facebook</button>
        <button onClick={() => handleShare("Twitter")}>Twitter</button>
      </div>
    </div>
  );
};

export default ProjectShare;
