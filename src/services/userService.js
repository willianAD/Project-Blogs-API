const { User } = require('../models');

const getAllUsers = () => User.findAll();

const getUsersEmail = ({ email }) => User.findOne({ where: email });

module.exports = {
  getAllUsers,
  getUsersEmail,
};
