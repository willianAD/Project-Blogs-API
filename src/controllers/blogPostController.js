const { blogPostService } = require('../services');

// const createPost = async (req, res) => {
//   const { name } = req.body;
  
//   const result = await blogPostService.createCategories({ name });
  
//   return res.status(201).json(result.dataValues);
// };

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

module.exports = {
  // createPost,
  getBlogPost,
  getBlogPostById,
};
