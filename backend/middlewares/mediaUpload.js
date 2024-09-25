const multer = require("multer");

const path = require("path");

// Set storage engine
const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    console.log(file)
    cb(null, "uploads/"); // Change to your preferred directory
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Filter for image and video files
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("video/")
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only images and videos are allowed."),
      false
    );
  }
};


// Initialize upload
const mediaUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = mediaUpload;
