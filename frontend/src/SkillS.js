import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSkills } from "./redux/apiCalls/skillApiCall";

const SkillSelector = ({ selectedSkills, onSkillChange }) => {
  const dispatch = useDispatch();
  const { skills } = useSelector((state) => state.skill || { skills: [] });
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(fetchAllSkills());
  }, [dispatch]);

  // Group skills by category
  const categories = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill.name);
    return acc;
  }, {});

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
    <div className="flex flex-col gap-6 md:w-1/3 bg-white rounded-2xl p-4">
      <label htmlFor="skills">المهارات المطلوبة</label>

      <select
        id="categories"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">Select Category</option>
        {Object.keys(categories).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <div className="skills-list">
        {selectedCategory && categories[selectedCategory]?.map((skill) => (
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
