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

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const usersAll = await userService.getAllUsers();
  
  if (usersAll.some((e) => e.email === email)) {
    return res.status(409).json({ message: 'User already registered' });
  }
  
  await userService.createUser({ displayName, email, password, image });

  const token = newToken(email);
  
  return res.status(201).json({ token });
};

module.exports = {
  login,
  createUser,
};
