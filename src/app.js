const express = require('express');

const { login, createUser, getUser, getUserId } = require('./controllers/userController');

const { createCategory, getCategories } = require('./controllers/categoryController');

const { getBlogPost } = require('./controllers/blogPostController');

const { validateToken } = require('./middlewares/validateToken');
const { validateUser } = require('./middlewares/validateUser');
const { validateName } = require('./middlewares/validateNameCategory');

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

app.post('/categories', validateToken, validateName, createCategory);

app.get('/categories', validateToken, getCategories);

app.get('/post', validateToken, getBlogPost);

module.exports = app;
