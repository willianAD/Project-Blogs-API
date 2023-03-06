const { categoryService } = require('../services');

const createCategory = async (req, res) => {
  const { name } = req.body;
  
  const result = await categoryService.createCategories({ name });
  
  return res.status(201).json(result.dataValues);
};

module.exports = {
  createCategory,
};
