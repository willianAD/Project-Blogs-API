const { Category } = require('../models');

const getAllCategories = () => Category.findAll();

const createCategories = (name) => Category.create(name);

// const getByCategoryId = (id) => Category.findByPk(id);

module.exports = {
  getAllCategories,
  // getByCategoryId,
  createCategories,
};
