const router = require("express").Router();
const {
  createPostCtrl,
  getAllPostsCtrl,
  getSinglePostCtrl,
  getPostCountCtrl,
  deletePostCtrl,
  updatePostCtrl,
  updatePostImageCtrl,
  toggleLikeCtrl,
} = require("../controllers/postsController");
const mediaUpload = require("../middlewares/mediaUpload");
const { verifyToken } = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");

// /api/posts
router
  .route("/")
  .post(verifyToken, mediaUpload.single("image"), createPostCtrl)
  .get(getAllPostsCtrl);

// /api/posts/count
router.route("/count").get(getPostCountCtrl);

// /api/posts/:id
router
  .route("/:id")
  .get(validateObjectId, getSinglePostCtrl)
  .delete(validateObjectId, verifyToken, deletePostCtrl)
  .put(validateObjectId, verifyToken, updatePostCtrl);

// /api/posts/update-image/:id
router
  .route("/update-image/:id")
  .put(
    validateObjectId,
    verifyToken,
    mediaUpload.single("image"),
    updatePostImageCtrl
  );

// /api/posts/like/:id
router.route("/like/:id").put(validateObjectId, verifyToken, toggleLikeCtrl);

module.exports = router;
