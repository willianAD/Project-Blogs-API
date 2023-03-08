const { User } = require('../models');

const getAllUsers = () => User.findAll();

const getUsersEmail = (email) => User.findOne({ where: { email } });

const getByUserId = (id) => User.findByPk(id);

const createUser = (user) => User.create(user);

const deleteByUserId = (id) => User.destroy({ where: { id } });

module.exports = {
  getAllUsers,
  getUsersEmail,
  getByUserId,
  createUser,
  deleteByUserId,
};
