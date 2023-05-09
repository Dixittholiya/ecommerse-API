const mongoose = require('mongoose');
const {Schema} = mongoose
const complete_order = new Schema({
    user_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'user'
    },
    product_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'product_data'
    },
    seler_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'seler_data'
    },
    orders: {type: Number},
    complete_order: {type: String},
  });

  const Complete_order = mongoose.model('complete order', complete_order);


  module.exports = Complete_order