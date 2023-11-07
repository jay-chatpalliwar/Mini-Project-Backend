const mongoose = require('mongoose');
const User = require('../../model/user');

exports.fetchResources = async (req, res) => {
  try {
    const { role, id } = req.body; // Destructure role and id from the request body

    // Ensure id is a valid ObjectId
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID' });
    }

    let user;

    if (role === 'student') {
      user = await User.findById(id).populate('saved_resources');
    } else {
      user = await User.findById(id).populate('resources');
    }

    if (!user) {
      return res.status(400).json({ success: false, message: 'No user found' });
    }

    const resource = role === 'student' ? user.saved_resources : user.resources;
   
    return res.status(200).json({
      success: true,
      message: 'Resources fetched successfully',
      resources: resource,
    });
  } catch (e) {
    console.error('Error while fetching resources', e);
    return res.status(500).json({
      success: false,
      message: 'Error while fetching resources',
      error: e.message,
    });
  }
};
