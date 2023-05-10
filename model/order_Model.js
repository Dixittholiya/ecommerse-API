const mongoose = require('mongoose');
const {Schema} = mongoose
const seler_data = new Schema({
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
    orderPrice: {type : Number},
    pending: {type : String },
  });

  const seler_register = mongoose.model('Order', seler_data);


  module.exports = seler_register