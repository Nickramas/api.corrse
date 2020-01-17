const mongoose = require('mongoose');
const userSchema = require('./../db/schemas/user.schema');
const bcrypt = require('bcrypt');

class UsersService {
  constructor() {
    this.userModel = mongoose.model('User', userSchema);
  }

  async get(id) {
    return await this.userModel.findById(id);
  }

  async create(userDto) {
    userDto.password = await bcrypt.hash(userDto.password, 8);
    const user = await new this.userModel(userDto);
    return user.save();
  }

  async update(id, updates) {
    return await this.userModel.findByIdAndUpdate(id, updates);
  }

  async delete(id) {
    return await this.userModel.findByIdAndDelete(id);
  }
}

module.exports = UsersService;
