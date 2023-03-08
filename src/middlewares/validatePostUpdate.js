const validatePutPost = (req, res, next) => {
  const { title, content } = req.body;

  if (!title.length) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  if (!content.length) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  return next();
};

module.exports = {
  validatePutPost,
};
