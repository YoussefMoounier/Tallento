import React, { useState } from "react";
import { FaRegNewspaper, FaUser, FaTag, FaProjectDiagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import request from "../utils/request";
import "./Search.css";
import LoadingSpinner from "../components/isLoading/LoadingSpinner"; // Ensure this is the correct path

const SearchComponent = () => {
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
        placeholder="يمكنك البحث بالاسم، البلد، المستخدم، التصنيف و المشروع"
      />

      <div className="search-links">
        {Object.entries(results).map(([key, value]) => (
          <div key={key} className="search-link">
            <div onClick={() => setResults({ [key]: value })}>
              {key === "users"
                ? "مستخدم"
                : key === "posts"
                ? "منشور"
                : key === "categories"
                ? "تصنيف"
                : key === "projects"
                ? "مشروع"
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
                <h3>Users</h3>
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
                <h3>Posts</h3>
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
                <h3>Categories</h3>
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
                <h3>Projects</h3>
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
