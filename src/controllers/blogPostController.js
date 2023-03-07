const jwt = require('jsonwebtoken');
const { blogPostService, userService, categoryService } = require('../services');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const token = req.header('authorization');

  const veryfyCategoruId = await Promise.all(categoryIds
    .map((e) => categoryService.getCategoryById(e)));
  
  if (veryfyCategoruId.includes(null)) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  const secret = process.env.JWT_SECRET;
  const { data } = jwt.verify(token, secret);

  const id = await userService.getUsersEmail(data);

  const userId = id.dataValues.id;
  
  const result = await Promise.all(categoryIds
    .map((e) => blogPostService.createBlogPost({ title, content, userId, categoryIds: e })));

  // const result = await blogPostService.createBlogPost({ title, content, userId });

  return res.status(201).json(result[0]);
};

const getBlogPost = async (_req, res) => {
  const posts = await blogPostService.getAllPosts();

  const allPosts = posts.map((e) => e.dataValues);

  return res.status(200).json(allPosts);
};

const getBlogPostById = async (req, res) => {
  const { id } = req.params;

  const verifyId = await blogPostService.getOneBlogPost(id);

  if (!verifyId) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  const posts = await blogPostService.getByBlogPostId(id);

  const allPosts = posts.map((e) => e.dataValues);

  return res.status(200).json(allPosts[0]);
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  const verifyId = await blogPostService.getOneBlogPost(id);

  if (!verifyId) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  await blogPostService.deleteByBlogPostId(id);

  return res.status(204).end();
};

module.exports = {
  createPost,
  getBlogPost,
  getBlogPostById,
  deletePost,
};
