const mongoose = require('mongoose');
const {Schema} = mongoose
const BlogSelerAndUser = new Schema({
    name: { type: String},
    email: { type: String},
    password: { type: String},
    mobile: { type: Number},
    idBlog: { type: String},

  });

  const BlogSelerAndUsers = mongoose.model('Blog user & seler', BlogSelerAndUser);


  module.exports = BlogSelerAndUsers