const jwt = require('jsonwebtoken');
const { userService } = require('../services');

const validateToken = async (req, res, next) => {
  const token = req.header('authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
  const secret = process.env.JWT_SECRET;
  const decoded = jwt.verify(token, secret);
  
  await userService.getByUserId(decoded.data.id);
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
    
  return next();
};

module.exports = {
  validateToken,
};
