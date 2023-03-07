const jwt = require('jsonwebtoken');
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

  // const { password: _, ...userData } = user.dataValues;
  const token = newToken(email);
  
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

const getUser = async (_req, res) => {
  const usersAll = await userService.getAllUsers();

  const result = usersAll
    .map((e) => ({ id: e.id, displayName: e.displayName, email: e.email, image: e.image }));

  return res.status(200).json(result);
};

const getUserId = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getByUserId(id);
  
  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }

  const { password: _, ...userData } = user.dataValues;

  return res.status(200).json(userData);
};

const deleteUser = async (req, res) => {
  const token = req.header('authorization');

  const secret = process.env.JWT_SECRET;
  const { data } = jwt.verify(token, secret);

  const getId = await userService.getUsersEmail(data);

  if (!getId) {
    return res.status(404).json({ message: 'User does not exist' });
  }

  const { id } = getId.dataValues;
  await userService.deleteByUserId(id);

  return res.status(204).end();
};

module.exports = {
  login,
  createUser,
  getUser,
  getUserId,
  deleteUser,
};
