import React, {
  useEffect,
  useRef,
  useCallback,
  useState,
  useContext,
} from "react"; // Import useContext
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPostsCount } from "../../redux/apiCalls/postApiCall";
import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { LanguageContext } from "../../context/LanguageContext";
import "./home.css";
import Sorting from "../../components/sidebar/Sorting";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, postsCount } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const { language } = useContext(LanguageContext); // Use context for language

  const [pageNumber, setPageNumber] = useState(1);
  const [sortType, setSortType] = useState("latest");
  const [isLoading, setIsLoading] = useState(false);

  const observer = useRef();

  useEffect(() => {
    dispatch(getPostsCount());
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchPosts(pageNumber, sortType)).finally(() => {
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

  return (
    <section className="home mt-8">
      <div className="home-container">
        <div className="posts-cont">
          <PostList posts={posts} lastPostRef={lastPostRef} />
          {isLoading && <div className="spinner">Loading...</div>}
        </div>
        <Sidebar
          sortType={sortType}
          setSortType={setSortType}
          fetchPosts={fetchPosts}
        />
      </div>
    </section>
  );
};

export default Home;
