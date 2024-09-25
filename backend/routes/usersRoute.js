const router = require("express").Router();
const {
  getAllUsersCtrl,
  getUserProfileCtrl,
  updateUserProfileCtrl,
  getUsersCountCtrl,
  profilePhotoUploadCtrl,
  deleteUserProfileCtrl,
} = require("../controllers/usersController");
const {
  verifyTokenAndAdmin,
  verifyTokenAndOnlyUser,
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");
const mediaUpload = require("../middlewares/mediaUpload");
const BlockedUser = require("../models/BlockedUser");
const { User } = require("../models/User");
// /api/users/profile
router.route("/profile").get(verifyTokenAndAdmin, getAllUsersCtrl);

// /api/users/profile/profile-photo-upload
router
  .route("/profile/profile-photo-upload")
  .post(verifyToken, mediaUpload.single("image"), profilePhotoUploadCtrl);

// /api/users/profile/:id
router
  .route("/profile/:id")
  .get(validateObjectId, getUserProfileCtrl)
  .put(validateObjectId, verifyTokenAndOnlyUser, updateUserProfileCtrl)
  .delete(validateObjectId, verifyTokenAndAuthorization,deleteUserProfileCtrl);

// /api/users/count
router.route("/count").get(verifyTokenAndAdmin, getUsersCountCtrl);
router.post("/block", async (req, res) => {
  const { userIdToBlock } = req.body;

  try {
    const newBlock = new BlockedUser({
      userId: req.user._id,
      blockedUserId: userIdToBlock, 
    });

    await newBlock.save();
    res.status(201).json({ message: "User blocked successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error blocking user" });
  }
});



module.exports = router;
