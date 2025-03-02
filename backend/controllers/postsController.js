const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");
const {
  Post,
  validateCreatePost,
  validateUpdatePost,
} = require("../models/Post");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
  cloudinaryUploadVideo,
} = require("../utils/cloudinary");
const { Comment } = require("../models/Comment");

/**-----------------------------------------------
 * @desc    Create New Post
 * @route   /api/posts
 * @method  POST
 * @access  private (only logged in user)
 ------------------------------------------------*/

module.exports.createPostCtrl = asyncHandler(async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }

    // Validate request body
    const { error } = validateCreatePost(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const filePath = path.join(__dirname, `../uploads/${req.file.filename}`);

    // Check if file exists at the path
    if (!fs.existsSync(filePath)) {
      return res.status(500).json({ message: "File upload failed - file not found" });
    }

    let result;
    try {
      if (req.file.mimetype.startsWith("image")) {
        result = await cloudinaryUploadImage(filePath);
      } else if (req.file.mimetype.startsWith("video")) {
        result = await cloudinaryUploadVideo(filePath);
      } else {
        return res.status(400).json({ message: "Unsupported file type" });
      }
    } catch (uploadError) {
      console.error("Cloudinary upload error:", uploadError);
      return res.status(500).json({ message: "File upload to cloud failed" });
    }

    const post = await Post.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      user: req.user.id,
      media: {
        url: result.secure_url,
        publicId: result.public_id,
        resourceType: req.file.mimetype.startsWith("image") ? "image" : "video",
      },
    });

    res.status(201).json(post);

    // Clean up the uploaded file
    try {
      fs.unlinkSync(filePath);
    } catch (unlinkError) {
      console.error("Error deleting temporary file:", unlinkError);
    }
  } catch (error) {
    console.error("Post creation error:", error);
    res.status(500).json({ message: "Error creating post", error: error.message });
  }
});

/**-----------------------------------------------
 * @desc    Get All Posts
 * @route   /api/posts
 * @method  GET
 * @access  public
 ------------------------------------------------*/


 module.exports.getAllPostsCtrl = asyncHandler(async (req, res) => {
  const POST_PER_PAGE = 3;
  const { pageNumber, category, sortType } = req.query;

  let posts;

  if (sortType === "most_liked") {
    posts = await Post.aggregate([
      {
        $addFields: {
          numLikes: { $size: "$likes" }
        }
      },
      {
        $sort: { numLikes: -1 } // Sort by number of likes descending
      },
      {
        $skip: (pageNumber - 1) * POST_PER_PAGE
      },
      {
        $limit: POST_PER_PAGE
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          'user.password': 0
        }
      }
    ]);
  } else {
    // Default sort option
    let sortOption = { createdAt: -1 }; // Latest by default

    if (sortType === "oldest") {
      sortOption = { createdAt: 1 }; // Sort by oldest
    }

    const query = category ? { category } : {};
    posts = await Post.find(query)
      .sort(sortOption)
      .skip((pageNumber - 1) * POST_PER_PAGE)
      .limit(POST_PER_PAGE)
      .populate("user", ["-password"]);
  }

  res.status(200).json(posts);
});




/**-----------------------------------------------
 * @desc    Get Single Post
 * @route   /api/posts/:id
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getSinglePostCtrl = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  .populate("user", ["-password"])
  .populate("comments");
  
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }

  res.status(200).json(post);
});

/**-----------------------------------------------
 * @desc    Get Posts Count
 * @route   /api/posts/count
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getPostCountCtrl = asyncHandler(async (req, res) => {
  const count = await Post.countDocuments();
  res.status(200).json(count);
});

/**-----------------------------------------------
 * @desc    Delete Post
 * @route   /api/posts/:id
 * @method  DELETE
 * @access  private (only admin or owner of the post)
 ------------------------------------------------*/
module.exports.deletePostCtrl = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }

  if (req.user.isAdmin || req.user.id === post.user.toString()) {
    await Post.findByIdAndDelete(req.params.id);
    await cloudinaryRemoveImage(post.image.publicId);

    // Delete all comments that belong to this post
    await Comment.deleteMany({ postId: post._id });

    res.status(200).json({
      message: "post has been deleted successfully",
      postId: post._id,
    });
  } else {
    res.status(403).json({ message: "access denied, forbidden" });
  }
});

/**-----------------------------------------------
 * @desc    Update Post
 * @route   /api/posts/:id
 * @method  PUT
 * @access  private (only owner of the post)
 ------------------------------------------------*/
module.exports.updatePostCtrl = asyncHandler(async (req, res) => {
  // 1. Validation
  const { error } = validateUpdatePost(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // 2. Get the post from DB and check if post exist
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }

  // 3. check if this post belong to logged in user
  if (req.user.id !== post.user.toString()) {
    return res
      .status(403)
      .json({ message: "access denied, you are not allowed" });
  }

  // 4. Update post
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
      },
    },
    { new: true }
  ).populate("user", ["-password"])
  .populate("comments");

  // 5. Send response to the client
  res.status(200).json(updatedPost);
});

/**-----------------------------------------------
 * @desc    Update Post Image
 * @route   /api/posts/upload-image/:id
 * @method  PUT
 * @access  private (only owner of the post)
 ------------------------------------------------*/
module.exports.updatePostImageCtrl = asyncHandler(async (req, res) => {
  // 1. Validation
  if (!req.file) {
    return res.status(400).json({ message: "no image provided" });
  }

  // 2. Get the post from DB and check if post exist
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }

  // 3. Check if this post belong to logged in user
  if (req.user.id !== post.user.toString()) {
    return res
      .status(403)
      .json({ message: "access denied, you are not allowed" });
  }

  // 4. Delete the old image
  await cloudinaryRemoveImage(post.image.publicId);

  // 5. Upload new photo
  const imagePath = path.join(__dirname, `../uploads/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);

  // 6. Update the image field in the db
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        image: {
          url: result.secure_url,
          publicId: result.public_id,
        },
      },
    },
    { new: true }
  );

  // 7. Send response to client
  res.status(200).json(updatedPost);

  // 8. Remvoe image from the server
  fs.unlinkSync(imagePath);
});

/**-----------------------------------------------
 * @desc    Toggle Like
 * @route   /api/posts/like/:id
 * @method  PUT
 * @access  private (only logged in user)
 ------------------------------------------------*/
const sendEmail = require("../utils/sendEmail");

module.exports.toggleLikeCtrl = asyncHandler(async (req, res) => {
  const loggedInUser = req.user.id;
  const { id: postId } = req.params;

  let post = await Post.findById(postId).populate("user");
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }

  const isPostAlreadyLiked = post.likes.find(
    (user) => user.toString() === loggedInUser
  );

  const likeUser = await User.findById(loggedInUser);

  if (isPostAlreadyLiked) {
    post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loggedInUser },
      },
      { new: true }
    );
  } else {
    post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: loggedInUser },
      },
      { new: true }
    );

    // Send email notification to post owner
    const emailTemplate = `
      <h3>New Like Notification</h3>
      <p>${likeUser.username} liked your post "${post.title}"</p>
      <p>View your post: ${process.env.CLIENT_URL}/posts/details/${post._id}</p>
    `;

    try {
      await sendEmail(
        post.user.email,
        "New Like on Your Post",
        emailTemplate
      );
    } catch (error) {
      console.log("Email notification failed:", error);
    }
  }

  res.status(200).json(post);
});
