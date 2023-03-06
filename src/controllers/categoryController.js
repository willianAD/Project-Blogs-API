const { categoryService } = require('../services');

const createCategory = async (req, res) => {
  const { name } = req.body;
  
  const result = await categoryService.createCategories({ name });
  
  return res.status(201).json(result.dataValues);
};

const getCategories = async (_req, res) => {
  const categories = await categoryService.getAllCategories();

  const allCategories = categories.map((e) => e.dataValues);

  return res.status(200).json(allCategories);
};

module.exports = {
  createCategory,
  getCategories,
};
