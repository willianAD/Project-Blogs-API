const { Category } = require('../models');

const getAllCategories = () => Category.findAll();

const createCategories = (name) => Category.create(name);

const getCategoryById = (id) => Category.findByPk(id);

module.exports = {
  getAllCategories,
  createCategories,
  getCategoryById,
};
