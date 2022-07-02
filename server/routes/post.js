const router = require("express").Router();
const verifyToken = require("../middleware/auth");
const Post = require("../models/Post");

// @route GET api/blog/
// @desc Get posts
// @access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
// @route POST api/blog/
// @desc Add Post
// @access Private
router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title is required!" });
  }

  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || "TO DO",
      user: req.userId,
    });
    await newPost.save();

    return res
      .status(200)
      .json({ success: true, message: "Enjoy your work! 🥰", post: newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
});
// @route PUT api/blog/:id
// @desc Update Post
// @access Private
router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title is required!" });
  }

  try {
    let updatePost = {
      title,
      description: description || "",
      url: url ? (url.startsWith("https://") ? url : `https://${url}`) : "",
      status: status || "TO DO",
    };

    const postUpdateCondition = { _id: req.params.id, user: req.userId };

    updatePost = await Post.findOneAndUpdate(postUpdateCondition, updatePost, {
      new: true,
    });

    if (!updatePost) {
      return res.status(401).json({
        success: false,
        message: "Post's not found or user not authorized!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Update Progress is successful",
      post: updatePost,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error!" });
  }
});
// @route DELETE api/blog/:id
// @desc DELETE Post
// @access Private
router.delete("/:id", verifyToken, async (req, res) => {
  const condition = {
    _id: req.params.id,
    user: req.userId,
  };
  try {
    const deletedPost = await Post.findOneAndDelete(condition);
    if (!deletedPost) {
      return res.status(401).json({
        success: false,
        message: "Post's not found or user not authorized!",
      });
    }
    return res.status(200).json({
      success: true,
      message: `Delete post with id = ${deletedPost._id} successfully!`,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error!" });
  }
});
module.exports = router;
