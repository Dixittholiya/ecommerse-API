const mongoose = require('mongoose');
const {Schema} = mongoose
const User_data = new Schema({
    name: { type: String},
    email: { type: String},
    password: { type: String},
    mobile: { type: Number},
    // pending: { type: String},
  });


  const user_login_register = mongoose.model('user', User_data);


  module.exports = user_login_register