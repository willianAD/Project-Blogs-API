const validateLogin = (req, res, next) => {
  const token = req.header('authorization');

  if (!token) {
    return res.sendStatus(500);
  }

  return next();
};

module.exports = {
  validateLogin,
};
