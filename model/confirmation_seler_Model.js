const mongoose = require('mongoose');
const {Schema} = mongoose
const Confirmationseler = new Schema({
    name: { type: String},
    email: { type: String},
    password: { type: String},
    mobile: { type: Number},
    confirmation: { type: String},
    
  });

  const confirmationseler = mongoose.model('confirmation seler', Confirmationseler);


  module.exports = confirmationseler