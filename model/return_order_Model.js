const mongoose = require('mongoose');
const {Schema} = mongoose
const return_order = new Schema({
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
    return_order: {type: String},
  });

  const Return_order = mongoose.model('return order', return_order);

  module.exports = Return_order