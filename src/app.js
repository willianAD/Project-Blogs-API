const express = require('express');

const { login, createUser } = require('./controllers/userController');

// const { validateLogin } = require('./middlewares/validateLogin');
const { validateUser } = require('./middlewares/validateUser');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', login);

app.post('/user', validateUser, createUser);

module.exports = app;
