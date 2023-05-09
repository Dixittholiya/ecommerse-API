const mongoose = require('mongoose');
const {Schema} = mongoose
const user_card = new Schema({
    user_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'user'
    },
    title1: { type: String},
    price1: { type: String},
    discount1: { type: String},
    rating1: { type: String},
    stock1: { type: Number},
    brand1: { type: String},
    category1: { type: String},
    image1: { type: String},
    order1 : {type: Number}
  });
  const User_card = mongoose.model('User Card', user_card);

  module.exports = User_card