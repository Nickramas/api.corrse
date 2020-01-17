require('dotenv').config();
require('./db/database');
const express = require('express');
const app = express();

const usersRouter = require('./routes/users.router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', usersRouter);

app.get('/api', (req, res) => {
  res.send(200);
});

module.exports = app;
