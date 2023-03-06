const { Category } = require('../models');

const getAllCategories = () => Category.findAll();

const createCategories = (name) => Category.create(name);

module.exports = {
  getAllCategories,
  createCategories,
};
