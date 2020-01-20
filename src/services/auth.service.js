const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const userSchema = require('../db/schemas/user.schema');

class AuthService {
  constructor() {
    this.userModel = mongoose.model('User', userSchema);
  }

  async loginAndGetToken(email, password) {
    const user = await this.userModel.findOne({ email: email });

    if (!user) {
      throw new Error('User not found');
    }

    console.log(user);
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error('Password not correct');
    }

    const token = jwt.sign(
      { _id: user._id, alias: user.alias, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
    );

    user.tokens.push(token);
    await user.save();

    return token;
  }
}

module.exports = AuthService;
