require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  process.env.DATABASE_PATH,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  err => {
    if (err) {
      console.log('Database connection faild', process.env.DATABASE_PATH);
      return 1;
    }

    console.log('Connected to database at', process.env.DATABASE_PATH);
  },
);

app.get('/', (req, res) => {
  res.send(200);
});

module.exports = app;
