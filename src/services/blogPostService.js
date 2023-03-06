const { BlogPost, User, Category } = require('../models');

const getAllPosts = () => BlogPost.findAll({
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});

// const createBlogPost = (name) => BlogPost.create(name);

const getByBlogPostId = (id) => BlogPost.findAll({
  where: { id },
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});

const getOneBlogPost = (id) => User.findByPk(id);

module.exports = {
  getAllPosts,
  getByBlogPostId,
  getOneBlogPost,
  // createBlogPost,
};
