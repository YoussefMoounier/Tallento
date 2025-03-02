import PostItem from "./PostItem";
import "./posts.css";
import { useEffect, useRef, useCallback } from "react";

const PostList = ({ posts, lastPostRef }) => {
  const videoRefs = useRef(new Map());
  const observerRef = useRef(null);

  const handleVideoIntersection = useCallback((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      const videoId = video.dataset.videoId;
      const videoData = videoRefs.current.get(videoId);

      if (!videoData) return;

      if (entry.isIntersecting) {
        const visibleRatio = entry.intersectionRatio;
        if (visibleRatio >= 0.7) {
          video.play().catch((err) => {
            console.log("Video play error:", err);
            videoData.hasPlayError = true;
          });
          videoData.isPlaying = true;
        }
      } else {
        if (videoData.isPlaying) {
          video.pause();
          videoData.isPlaying = false;
        }
      }
    });
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleVideoIntersection, {
      threshold: [0, 0.25, 0.5, 0.75, 1],
      rootMargin: "-10% 0px",
    });

    const observer = observerRef.current;

    // Clean up old video refs
    videoRefs.current.clear();

    // Find and observe all video elements
    const videoElements = document.querySelectorAll("video[data-video-id]");
    videoElements.forEach((video) => {
      const videoId = video.dataset.videoId;
      videoRefs.current.set(videoId, {
        element: video,
        isPlaying: false,
        hasPlayError: false,
      });
      observer.observe(video);
    });

    return () => {
      videoElements.forEach((video) => {
        observer.unobserve(video);
      });
      videoRefs.current.clear();
    };
  }, [handleVideoIntersection, posts]);

  if (!posts || posts.length === 0) {
    return <p>No posts available.</p>;
  }

  return (
    <div className="md:w-1/2 mx-auto flex flex-col gap-4 rounded-2xl p-4 bg-bg">
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
