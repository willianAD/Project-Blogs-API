const express = require('express');

const {
  login,
  createUser,
  getUser,
  getUserId,
  deleteUser,
} = require('./controllers/userController');

const { createCategory, getCategories } = require('./controllers/categoryController');

const {
  getBlogPost,
  getBlogPostById,
  createPost,
  deletePost,
  putBlogPostById,
} = require('./controllers/blogPostController');

const { validateToken } = require('./middlewares/validateToken');
const { validateUser } = require('./middlewares/validateUser');
const { validateName } = require('./middlewares/validateNameCategory');
const { validateInputs } = require('./middlewares/validateBlogPost');
const { validatePutPost } = require('./middlewares/validatePostUpdate');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', login);

app.post('/user', validateUser, createUser);

app.get('/user/:id', validateToken, getUserId);

app.get('/user', validateToken, getUser);

app.delete('/user/me', validateToken, deleteUser);

app.post('/categories', validateToken, validateName, createCategory);

app.get('/categories', validateToken, getCategories);

app.get('/post/:id', validateToken, getBlogPostById);

app.post('/post', validateInputs, validateToken, createPost);

app.get('/post', validateToken, getBlogPost);

app.put('/post/:id', validatePutPost, validateToken, putBlogPostById);

app.delete('/post/:id', validateToken, deletePost);

module.exports = app;
