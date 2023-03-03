const { User } = require('../models/User');

const login = async (req, res) => {
  const { displayName, email, password, images } = req.body;
  const user = await User.create({ displayName, email, password, images });

  if (!user) {
    return res.status(400).send({ message: 'Some required fields are missing' });
  }
  
  return res.status(200).json({ token: 'foi' });
};

module.exports = {
  login,
};
