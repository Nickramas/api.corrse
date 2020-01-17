const mongoose = require('mongoose');
const userSchema = require('./../db/schemas/user.schema');

class UsersService {
  constructor() {
    this.userModel = mongoose.model('User', userSchema);
  }

  async get(id) {
    if (id) {
      return await this.userModel.findById(id);
    }

    return await this.userModel.find({}).exec();
  }

  async create(userDto) {
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
