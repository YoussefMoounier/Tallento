import React, { useState } from "react";

const categories = {
  Programming: [
    "React",
    "Node.js",
    "MongoDB",
    "Express.js",
    "JavaScript",
    "HTML",
    "CSS",
    "Python",
    "Django",
    "Flask",
    "Angular",
    "Vue.js",
    "TypeScript",
    "GraphQL",
  ],
  Editing: [
    "Video Editing",
    "Photo Editing",
    "Audio Editing",
    "Content Editing",
  ],
  VoiceOver: ["Narration", "Character Voices", "Commercials", "Audiobooks"],
  // Add more categories as needed
};

const SkillSelector = ({ selectedSkills, onSkillChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    Object.keys(categories)[0]
  );

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    let newSkills = [...selectedSkills];
    if (checked) {
      newSkills.push(value);
    } else {
      newSkills = newSkills.filter((skill) => skill !== value);
    }
    onSkillChange(newSkills);
  };

  return (
    <div className="form-group">
      <label htmlFor="skills">المهارات المطلوبة</label>

      <select
        id="categories"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        {Object.keys(categories).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <div className="skills-list">
        {categories[selectedCategory].map((skill) => (
          <div className="skill-item" key={skill}>
            <input
              type="checkbox"
              id={skill}
              value={skill}
              onChange={handleSkillChange}
              checked={selectedSkills.includes(skill)}
            />
            <label htmlFor={skill}>{skill}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillSelector;
