import React, { useEffect, useRef } from "react";

const UserDetails = ({ user, userPosts, onCloseDetails }) => {
  const userDetailsRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        userDetailsRef.current &&
        !userDetailsRef.current.contains(event.target)
      ) {
        onCloseDetails();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onCloseDetails]);

  return (
    <div className="UserDetailsContainer" ref={userDetailsRef}>
      <button onClick={onCloseDetails}>Close</button>
      <div>
        <h2>{user.username}</h2>
        <p>Email: {user.email}</p>
        <img src={user.profilePhoto.url} alt="" />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <h3
          style={{
            color: "blue",
            fontSize: "1.5rem",
            background: "gray",
            margin: "80px",
            padding: "20px",
          }}
        >
          User Posts:
        </h3>{" "}
        <ul>
          {userPosts.map((post) => (
            <li key={post._id}>
              {/* <Post post={post} postUser={user} /> */}
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <p>Category: {post.category}</p>
              <img src={post.image} alt="" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDetails;
