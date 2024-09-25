import React, { useEffect, useRef, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPostsCount } from "../../redux/apiCalls/postApiCall";
import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import "./home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, postsCount } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  const [pageNumber, setPageNumber] = useState(1);
  const [sortType, setSortType] = useState("latest");
  const [isLoading, setIsLoading] = useState(false);

  const observer = useRef();

  useEffect(() => {
    dispatch(getPostsCount());
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchPosts(pageNumber, sortType))
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, pageNumber, sortType]);

  const lastPostRef = useCallback(
    (node) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && posts.length < postsCount) {
          setPageNumber((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, posts.length, postsCount]
  );

  const handleSortChange = (e) => {
    setSortType(e.target.value);
    setPageNumber(1);
    // Reset the posts array and fetch the first page with the new sort type
    dispatch(fetchPosts(1, e.target.value));
  };

  return (
    <section className="home">
      <div className="home-container">
        
        <div className="posts-cont">
          <div className="add-post">
            <Link className="add-post-link" to={user ? `/post-form` : `/login`}>
              <span className="add-post-title">Add Post</span>
              <span className="add-post-icon">
                <FaPlusCircle />
              </span>
            </Link>
            
          </div>
          
      
      <div>

<label htmlFor="sort"> ترتيب المنشورات: </label>
     
          <select
  className="select-sort"
  onChange={handleSortChange}
  value={sortType} // Ensure the correct option is selected
>
  <option value="latest">الاحدث</option>
  <option value="oldest">الاقدم</option>
  <option value="most_liked">الاكثر اعجاب</option>
</select>
 </div>
          <PostList posts={posts} lastPostRef={lastPostRef} />
          {isLoading && <div className="spinner">Loading...</div>}
        </div>
        <Sidebar />
      </div>
    </section>
  );
};

export default Home;
