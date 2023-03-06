const { blogPostService } = require('../services');

// const createPost = async (req, res) => {
//   const { name } = req.body;
  
//   const result = await blogPostService.createCategories({ name });
  
//   return res.status(201).json(result.dataValues);
// };

const getBlogPost = async (req, res) => {
  const posts = await blogPostService.getAllPosts();

  const allPosts = posts.map((e) => e.dataValues);

  return res.status(200).json(allPosts);
};

module.exports = {
  // createPost,
  getBlogPost,
};
