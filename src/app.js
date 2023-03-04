const express = require('express');

const { login } = require('./controllers/userController');

// const { validateLogin } = require('./middlewares/validateLogin');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', login);

module.exports = app;
