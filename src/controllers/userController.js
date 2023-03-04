const { userService } = require('../services');
const { newToken } = require('../utils/token');

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const user = await userService.getUsersEmail(email);

  if (user.email !== email || user.password !== password) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  const { password: _, ...userData } = user.dataValues;
  const token = newToken(userData);
  
  return res.status(200).json({ token });
};

module.exports = {
  login,
};
