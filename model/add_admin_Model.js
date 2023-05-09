const mongoose = require('mongoose');
const {Schema} = mongoose
const adminData = new Schema({
    name: {type: String},
    email: {type: String},
    password: {type : String },
  });

  const AdminData = mongoose.model('admin_data', adminData);


  module.exports = AdminData