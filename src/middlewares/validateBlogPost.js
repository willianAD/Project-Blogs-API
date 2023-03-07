const validateInputs = (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title.length) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  if (!content.length) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  if (!categoryIds.length || typeof categoryIds !== 'object') {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  return next();
};

module.exports = {
  validateInputs,
};
