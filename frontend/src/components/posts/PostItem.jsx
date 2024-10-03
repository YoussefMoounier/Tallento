import { useDispatch, useSelector } from "react-redux";
import { useState, useContext } from "react"; // Import useContext
import { Link } from "react-router-dom";
import { toggleLikePost } from "../../redux/apiCalls/postApiCall";
import CommentList from "../comments/CommentList";
import { toast } from "react-toastify";
import { LanguageContext } from "../../context/LanguageContext"; // Import the context

const PostItem = ({ post, username, userId }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { language } = useContext(LanguageContext); // Use context for language

  // Local state for likes
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(post.likes.includes(user?._id));

  const profileLink = userId
    ? `/profile/${userId}`
    : `/profile/${post?.user?._id}`;

  const handleToggleLike = () => {
    if (user) {
      dispatch(toggleLikePost(post._id))
        .then(() => {
          // Update local state after successful operation
          if (liked) {
            setLikes(likes.filter((id) => id !== user._id)); // Remove user's like
          } else {
            setLikes([...likes, user._id]); // Add user's like
          }
          setLiked(!liked); // Toggle like state
        })
        .catch((error) => {
          console.error("Error toggling like:", error);
        });
    } else {
      toast.warning(language === "en" ? "You must be logged in to like" : "يجب تسجيل الدخول لتفعيل الإعجاب");
    }
  };

  const renderMedia = () => {
    if (post.media?.resourceType === "video") {
      return (
        <video
          className="post-item-video"
          controls
          src={post.media?.url}
          alt="Post video"
        />
      );
    } else if (post.media?.resourceType === "image") {
      return (
        <img src={post.media?.url} alt="Post" className="post-item-image" />
      );
    } else {
      return null;
    }
  };

  return (
    <div className="post-item" key={post._id}>
      <div className="post-item-image-wrapper">{renderMedia()}</div>
      <div className="post-item-info-wrapper">
        <div className="post-item-info">
          <div className="post-item-likes" >
            
              <i
                onClick={handleToggleLike}
                className={liked ? "bi bi-heart-fill" : "bi bi-heart"}
              ></i>
            
            <small>{likes.length} اعجاب</small>
          </div>
          <div className="post-item-comments" >
            {user && (
              <i
                // onClick={handleToggleLike}
                className={liked ? "bi bi-chat-right-text" : "bi bi-chat-right-text-fill"}
              ></i>
            )}
            {/* <CommentList comments ={post?.comments}/> */}
            <small>{post?.comments?.length} تعليق</small>
          </div>
          <div className="post-item-author">
            <Link className="post-item-username" to={profileLink}>
              <img src={post?.user?.profilePhoto?.url} alt="" />
              {username ? username : post?.user?.username}
              <Link
                className="post-item-category"
                to={`/posts/categories/${post?.user?.country}`}
              >
                {post?.user?.country}
              </Link>
            </Link>
          </div>
          <div className="post-item-date">
            {new Date(post.createdAt).toDateString()}
          </div>
        </div>
        <div className="post-item-details">
          <h4 className="post-item-title">{post.title}</h4>
          <Link
            className="post-item-category"
            to={`/posts/categories/${post.category}`}
          >
            {post.category}
          </Link>
        </div>
        <p className="post-item-description">{post.description}</p>
        <Link className="post-item-link" to={`/posts/details/${post._id}`}>
          المزيد...
        </Link>
      </div>
    </div>
  );
};

export default PostItem;
