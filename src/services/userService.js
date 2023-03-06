const { User } = require('../models');

const getAllUsers = () => User.findAll();

const getUsersEmail = ({ email }) => User.findOne({ where: email });

const createUser = (user) => User.create(user);

module.exports = {
  getAllUsers,
  getUsersEmail,
  createUser,
};
