const mongoose = require('mongoose');

const connection = mongoose.connect(
  process.env.DATABASE_PATH,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  err => {
    if (err) {
      console.log('Database connection faild', process.env.DATABASE_PATH);
      return 1;
    }

    console.log('Connected to database at', process.env.DATABASE_PATH);
  },
);

module.exports = connection;
