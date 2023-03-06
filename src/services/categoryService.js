const { Category } = require('../models');

const getOneCategory = ({ name }) => Category.findOne({ where: name });

const createCategories = (name) => Category.create(name);

const getByCategoryId = (id) => Category.findByPk(id);

module.exports = {
  getOneCategory,
  getByCategoryId,
  createCategories,
};
