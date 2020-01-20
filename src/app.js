require('dotenv').config();
require('./db/database');
const express = require('express');
const app = express();

const usersRouter = require('./routes/users.router');
const authRouter = require('./routes/auth.router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', usersRouter);
app.use('/api/login', authRouter);

app.get('/api', (req, res) => {
  res.sendStatus(200);
});

module.exports = app;
