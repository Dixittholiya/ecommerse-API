const mongoose = require('mongoose');
const {Schema} = mongoose
const seler_data = new Schema({
    name: { type: String},
    email: { type: String},
    password: { type: String},
    mobile: { type: Number},
    pending: { type: String},
    status:{ type: String}
  });

  const seler_register = mongoose.model('seler_data', seler_data);


  module.exports = seler_register