import { Link } from "react-router-dom";
import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
import { LanguageContext } from "../../context/LanguageContext";
import Sorting from "./Sorting";
import { FaPlusCircle } from "react-icons/fa";

const Sidebar = ({ sortType, setSortType, fetchPosts }) => {
  const { language } = useContext(LanguageContext);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="sidebar bg-white rounded-2xl mt-8 p-4">

      <div className="bg-secodColor rounded-2xl px-2 py-1 text-white flex flex-row mb-4">
        <Link className="flex w-full justify-between" to={user ? `/post-form` : `/login`}>
          <span className="text-xs">
            {language === "en" ? "Add Post" : "إضافة منشور"}
          </span>
          <span className="">
            <FaPlusCircle />
          </span>
        </Link>
      </div>
      <h5 className="font-bold ">CATEGORIES</h5>
      <ul className="sidebar-links">
        {categories.map((category) => (
          <li className="" key={category._id}>
            <input type="checkbox" id={category._id} name={category.title} value={category.title} />
            <Link
              className="sidebar-lin"
              to={`/posts/categories/${category.title}`}
            >
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
        
              <Sorting
                sortType={sortType}
                setSortType={setSortType}
                language={language}
                dispatch={dispatch}
                fetchPosts={fetchPosts}
              />
    </div>
  );
};

export default Sidebar;
