const { User } = require("../models/userModel");

const peopleController = async (req, res) => {
  const users = await User.find({ verified: true }, { password: 0, createdAt: 0, updatedAt: 0 , verificationLinkSent: 0 });
  res.json(users);
  
};

module.exports = peopleController;