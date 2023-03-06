const { BlogPost, User, Category } = require('../models');

const getAllPosts = () => BlogPost.findAll({
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});

// const createBlogPost = (name) => BlogPost.create(name);

// const getByBlogPostId = (id) => BlogPost.findByPk(id);

module.exports = {
  getAllPosts,
  // getByBlogPostId,
  // createBlogPost,
};
