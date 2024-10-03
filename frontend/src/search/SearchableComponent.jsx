import React, { useState, useContext } from "react"; // Import useContext
import { FaRegNewspaper, FaUser, FaTag, FaProjectDiagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import request from "../utils/request";
import "./Search.css";
import LoadingSpinner from "../components/isLoading/LoadingSpinner"; // Ensure this is the correct path
import { LanguageContext } from "../context/LanguageContext"; // Import the context

const SearchComponent = () => {
  const { language } = useContext(LanguageContext); // Use context for language
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (searchQuery) => {
    setIsLoading(true);
    try {
      const response = await request.get(`/api/search?q=${searchQuery}`);
      setResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    setTimeout(() => {
      handleSearch(newQuery);
    }, 300);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={language === "en" ? "Search by name, country, user, category, and project" : "يمكنك البحث بالاسم، البلد، المستخدم، التصنيف و المشروع"}
      />

      <div className="search-links">
        {Object.entries(results).map(([key, value]) => (
          <div key={key} className="search-link">
            <div onClick={() => setResults({ [key]: value })}>
              {key === "users"
                ? language === "en" ? "User" : "مستخدم"
                : key === "posts"
                ? language === "en" ? "Post" : "منشور"
                : key === "categories"
                ? language === "en" ? "Category" : "تصنيف"
                : key === "projects"
                ? language === "en" ? "Project" : "مشروع"
                : ""}
              ({value.length})
            </div>
          </div>
        ))}
      </div>

      <div className="search-results">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Display user results */}
            {results.users && (
              <div className="search-results-section">
                <h3>{language === "en" ? "Users" : "المستخدمون"}</h3>
                <ul>
                  {results.users.map((user) => (
                    <li key={user._id}>
                      <Link to={`/profile/${user._id}`}>
                        <FaUser /> {user.username} 
                        {user.country && <span> - {user.country}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Display post results */}
            {results.posts && (
              <div className="search-results-section">
                <h3>{language === "en" ? "Posts" : "المنشورات"}</h3>
                <ul>
                  {results.posts.map((post) => (
                    <li key={post._id}>
                      <Link to={`/posts/details/${post._id}`}>
                        <FaRegNewspaper /> {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Display category results */}
            {results.categories && (
              <div className="search-results-section">
                <h3>{language === "en" ? "Categories" : "التصنيفات"}</h3>
                <ul>
                  {results.categories.map((category) => (
                    <li key={category._id}>
                      <FaTag /> {category.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Display project results */}
            {results.projects && (
              <div className="search-results-section">
                <h3>{language === "en" ? "Projects" : "المشاريع"}</h3>
                <ul>
                  {results.projects.map((project) => (
                    <li key={project._id}>
                      <FaProjectDiagram /> {project.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
