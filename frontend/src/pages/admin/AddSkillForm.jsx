import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import request from "../../utils/request";

const AddSkillForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  // Form Submit Handler
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Skill Title is required");
    if (category.trim() === "") return toast.error("Skill Category is required");

    try {
      const response = await request.post("/api/skills", { name: title, category });
      toast.success("Skill created successfully");
      setTitle("");
      setCategory("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating skill");
    }
  };

  return (
    <div className="add-category">
      <h6 className="add-category-title">Add New Skill</h6>
      <form onSubmit={formSubmitHandler}>
        <div className="add-category-form-group">
          <label htmlFor="title">Skill Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter Skill Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="add-category-form-group">
          <label htmlFor="category">Skill Category</label>
          <input
            type="text"
            id="category"
            placeholder="Enter Skill Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <button className="add-category-btn" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddSkillForm;