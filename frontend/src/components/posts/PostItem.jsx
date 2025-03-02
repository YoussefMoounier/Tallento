import { useDispatch, useSelector } from "react-redux";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { toggleLikePost } from "../../redux/apiCalls/postApiCall";
import { toast } from "react-toastify";
import { LanguageContext } from "../../context/LanguageContext";

const PostItem = ({ post, username, userId }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { language } = useContext(LanguageContext);

  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(post.likes.includes(user?._id));

  const profileLink = userId
    ? `/profile/${userId}`
    : `/profile/${post?.user?._id}`;

  const handleToggleLike = () => {
    if (user) {
      dispatch(toggleLikePost(post._id))
        .then(() => {
          if (liked) {
            setLikes(likes.filter((id) => id !== user._id));
          } else {
            setLikes([...likes, user._id]);
          }
          setLiked(!liked);
        })
        .catch((error) => {
          console.error("Error toggling like:", error);
        });
    } else {
      toast.warning(
        language === "en"
          ? "You must be logged in to like"
          : "يجب تسجيل الدخول لتفعيل الإعجاب"
      );
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
          data-video-id={post._id}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          playsInline
        />
      );
    } else if (post.media?.resourceType === "image") {
      return (
        <img
          src={post.media?.url}
          alt="Post"
          className="post-item-image"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <div
      className="h-[500px]  bg-white flex flex-col shadow-lg rounded-2xl p-4 md:w-1/2 mx-auto"
      key={post._id}
    >
      <div
        className="post-item-image-wrapper"
        style={{ height: "100%", width: "100%", overflow: "hidden" }}
      >
        <Link
          to={`/posts/details/${post._id}`}
          className="post-item-image-link"
        >
          {renderMedia()}
        </Link>
      </div>
      <div className="post-item-info-wrapper">
        <div className="post-item-info">
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

          <div className="flex flex-col items-center">
            <div className="post-item-details">
              <h4 className="post-item-title">{post.title}</h4>
            </div>
            <p className="post-item-description">{post.description}</p>

            <Link
              className="bg-deepPurple text-white py- px-4 rounded-md"
              to={`/posts/details/${post._id}`}
            >
              {language === "en" ? "More..." : "أكثر..."}
            </Link>
          </div>

          <div className="post-item-date flex flex-col">
            {new Date(post.createdAt).toDateString()}
            <Link
              className="post-item-category text-center"
              to={`/posts/categories/${post.category}`}
            >
              {post.category}
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row justify-center gap-8">
        <div className="post-item-likes">
          <i
            onClick={handleToggleLike}
            className={liked ? "bi bi-heart-fill" : "bi bi-heart"}
          ></i>
          <small>
            {likes.length} {language === "en" ? "likes" : "اعجاب"}
          </small>
        </div>
        <div className="post-item-comments">
          {user && (
            <i
              className={
                liked ? "bi bi-chat-right-text" : "bi bi-chat-right-text-fill"
              }
            ></i>
          )}
          {/* <i className="bi bi-chat-right-text-fill text-deepPurple"></i> */}
          <small>
            {post?.comments?.length} {language === "en" ? "comments" : "تعليق"}
          </small>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
