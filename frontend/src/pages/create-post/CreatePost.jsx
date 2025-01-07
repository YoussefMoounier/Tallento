import { useState, useEffect, useContext } from "react";
import "./create-post.css";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../redux/apiCalls/postApiCall";
import { RotatingLines } from "react-loader-spinner";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
import { LanguageContext } from "../../context/LanguageContext";

const CreatePost = () => {
  const dispatch = useDispatch();
  const { loading, isPostCreated } = useSelector((state) => state.post);
  const { categories } = useSelector((state) => state.category);
  const { language } = useContext(LanguageContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "")
      return toast.error(
        language === "en" ? "Post Title is required" : "عنوان المنشور مطلوب"
      );
    if (category.trim() === "")
      return toast.error(
        language === "en" ? "Post Category is required" : "فئة المنشور مطلوبة"
      );
    if (description.trim() === "")
      return toast.error(
        language === "en" ? "Post Description is required" : "وصف المنشور مطلوب"
      );
    if (!file)
      return toast.error(
        language === "en" ? "Post Image is required" : "صورة المنشور مطلوبة"
      );

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    dispatch(createPost(formData));
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (isPostCreated) {
      navigate("/");
    }
  }, [isPostCreated, navigate]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <section className="create-post">
      <h1 className="create-post-title font-bold">
        {language === "en" ? "Create New Post" : "إنشاء منشور جديد"}
      </h1>
      <form
        onSubmit={formSubmitHandler}
        className="create-post-form bg-white p-10 rounded-3xl"
      >
        <input
          type="text"
          placeholder={language === "en" ? "Post Title" : "ادخل عنوان المنشور"}
          className="border-2 border-secodColor bg-white p-4 rounded-2xl mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className=" border-2 border-secodColor bg-white rounded-2xl"
          rows="6"
          placeholder={language === "en" ? "Post Description" : "وصف المنشور"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border-2 border-secodColor bg-white p-4 rounded-2xl mt-4 mb-4"
        >
          <option disabled value="">
            {language === "en" ? "Select A Category" : "تصنيف موهبتك"}
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>

        <label
          htmlFor="file"
          className="border-2 border-secodColor bg-white p-4 rounded-2xl mb-4 cursor-pointer block text-center"
        >
          {language === "en" ? "Choose a file" : "رفع ملف: صورة\\فيديو"}
          <input
            type="file"
            name="file"
            id="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        <button
          type="submit"
          className="bg-secodColor rounded-full w-1/2 py-1 mx-auto mt-4"
        >
          {loading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="40"
              visible={true}
            />
          ) : language === "en" ? (
            "Create"
          ) : (
            "انشر موهبتك"
          )}
        </button>
      </form>
    </section>
  );
};

export default CreatePost;
