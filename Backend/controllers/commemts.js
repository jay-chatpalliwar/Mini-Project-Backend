const Post = require("../model/postModel");
const Comment = require("../model/commentModel");

exports.createComment = async (req, res) => {
  try {
    //fetch data from req body
    const { post, user, body } = req.body;
    //create comment object
    const comment = new Comment({
      post,
      user,
      body,
    });

    //save the comment
    // to db and return it back in response
    const savedComment = await comment.save();
    console.log(savedComment._id);
    //change in post section is also needed
    // here

    // we are fetching all posts with same id as that of current post
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: savedComment._id } },
      { new: true }
    )
      .populate("comments")
      .exec();

    res.json({
      // post: updatedPost._id,
      success:true,
      message:"comment added successfully",
      post:updatedPost
    });
  } catch (error) {
    console.log("error while creating a comment");
    return res.status(500).json({
      error: "Internal server error",
      message: error,
    });
  }
};

