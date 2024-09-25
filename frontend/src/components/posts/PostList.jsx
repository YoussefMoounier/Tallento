import PostItem from "./PostItem";
import "./posts.css";

const PostList = ({ posts, lastPostRef }) => {
  if (!posts || posts.length === 0) {
    return <p>No posts available.</p>; 
  }

  return (
    <div className="post-list">
      {posts.map((post, index) => {
        if (posts.length === index + 1) {
          return (
            <div key={post._id} ref={lastPostRef}>
              <PostItem post={post} />
            </div>
          );
        } else {
          return (
            <div key={post._id}>
              <PostItem post={post} />
            </div>
          );
        }
      })}
    </div>
  );
};

export default PostList;
