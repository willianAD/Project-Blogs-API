const jwt = require('jsonwebtoken');
const {
  blogPostService,
  userService,
  categoryService,
  postCategoryService,
} = require('../services');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const token = req.header('authorization');

  const veryfyCategoryId = await Promise.all(categoryIds
    .map((e) => categoryService.getCategoryById(e)));
  
  if (veryfyCategoryId.includes(null)) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  const secret = process.env.JWT_SECRET;
  const { data } = jwt.verify(token, secret);
  const id = await userService.getUsersEmail(data);
  const userId = id.dataValues.id;
  
  const result = await blogPostService.createBlogPost({ title, content, userId });

  const postId = result.dataValues.id;

  await Promise.all(categoryIds
    .map((e) => postCategoryService.createPostCategory({ postId, categoryId: e })));

  return res.status(201).json(result);
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
  const token = req.header('authorization');
  
  const secret = process.env.JWT_SECRET;
  const { data } = jwt.verify(token, secret);
  const getId = await userService.getUsersEmail(data);

  const verifyId = await blogPostService.getOneBlogPost(id);

  if (!verifyId) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  if (getId.dataValues.id !== verifyId.dataValues.userId) {
    console.log('entrei');
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  await blogPostService.deleteByBlogPostId(id);

  return res.status(204).end();
};

const putBlogPostById = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const token = req.header('authorization');
  
  const secret = process.env.JWT_SECRET;
  const { data } = jwt.verify(token, secret);
  const getId = await userService.getUsersEmail(data);

  if (getId.dataValues.id !== Number(id)) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  await blogPostService.putBlogPostId({ title, content, id });

  const posts = await blogPostService.getByBlogPostId(id);

  const allPosts = posts.map((e) => e.dataValues);
  console.log(allPosts);

  return res.status(200).json(allPosts[0]);
};

module.exports = {
  createPost,
  getBlogPost,
  getBlogPostById,
  deletePost,
  putBlogPostById,
};
