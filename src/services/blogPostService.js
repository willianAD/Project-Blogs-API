const { BlogPost, User, Category } = require('../models');

const getAllPosts = () => BlogPost.findAll({
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});

const createBlogPost = async ({ title, content, userId }) => BlogPost.create({
  title,
  content,
  userId,
  published: new Date(),
  updated: new Date(),
});

const getByBlogPostId = (id) => BlogPost.findAll({
  where: { id },
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});

const getOneBlogPost = (id) => BlogPost.findByPk(id);

const deleteByBlogPostId = (id) => BlogPost.destroy({ where: { id } });

module.exports = {
  getAllPosts,
  getByBlogPostId,
  getOneBlogPost,
  createBlogPost,
  deleteByBlogPostId,
};
