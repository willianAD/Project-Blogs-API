const validateLogin = (req, res, next) => {
  const token = req.header('authorization');

  console.log(token);

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  return next();
};

module.exports = {
  validateLogin,
};
