var order = require("../model/order_Model");
var completeorder = require("../model/complete_order_Model");
var return_order = require("../model/return_order_Model");
var product = require("../model/seler_product_Model");


// **********************************************total order 
const now_order = async(req,res) =>{
    try {
    let data1 = req.body
    let find = await product.findById(req.body.product_id)
    const objData = {
        orderPrice : find?.price,
        orderdiscount : find?.discount
    }

    let totalOrder = req.body.orders;
    let totalPrice = totalOrder*objData.orderPrice*objData.orderdiscount/100;

    pending0 = "0";
    const read_data1 = {
        pending : pending0,
        user_id : data1?.user_id,
        product_id : data1?.product_id,
        seler_id : data1?.seler_id,
        orders : data1?.orders,
        orderPrice:totalPrice
    };
   

    var data = await order.create(read_data1)

        res.status(200).json({
            status:"success your order",
            data,
        })
    } catch (error) {
        res.status(200).json({
            status:"error"
        })
    }
    
}


// // **********************************************total order 
// const now_order = async(req,res) =>{
//     let data1 = req.body
//     pending0 = "0";
//     let read_data1 = {
//         pending : pending0,
//         user_id : data1?.user_id,
//         product_id : data1?.product_id,
//         seler_id : data1?.seler_id,
//         orders : data1?.orders,
//     };
   

//     var data = await order.create(read_data1)

//     res.status(200).json({
//         status:"success your order",
//         data,
//     })
// }

// **********************************************view order 
const view_order = async(req,res) =>{
    let seler_id = req.body
    console.log(seler_id);
    var data1 = await order.find(seler_id).populate("seler_id");
    // var data1 = await order.find(_id).populate("product_id");
    res.status(200).json({
        status:"success logding your order view data",
        data1
    })
}

// **********************************************total order 
const total_order = async(req,res) => {
    let seler_id = req.body
    console.log(seler_id);
    var data = await order.find(seler_id).populate("seler_id").count();
    // var data1 = await order.find(seler_id).populate("seler_id");

    res.status(200).json({
        status:"success logding your order total data",
        data,
    })
}

// **********************************************seler total pending order 
const pending_order = async(req,res) => {
    let pending = req.body
    console.log(pending);
    var data1 = await order.find(pending);
    // var data1 = await order.find(_id).populate("product_id");
    res.status(200).json({
        status:"success logding your pending order",
        data1
    })
}

// **********************************************seler complete order 
const complete_order = async(req,res) => {
    let _id = req.params.id
    console.log(_id);
    var data1 = await order.findById(_id);
    let complete_order1 = "1";
    const obj = {
        complete_order : complete_order1,
        user_id : data1?.user_id,
        product_id : data1?.product_id,
        seler_id : data1?.seler_id,
        orders : data1?.orders,
    }
    console.log(obj);
    
    var data = await completeorder.create(obj);
    var delete1 = await order.findByIdAndDelete(_id);
    res.status(200).json({
        status:"success logding your pending order",
        data1,
        delete1,
        data
    })
}

// **********************************************user return order 
const return1_order = async(req,res) => {
    let _id = req.params.id
    console.log(_id);
    var data1 = await completeorder.findById(_id);
    let return_order1 = "2";
    const obj = {
        return_order : return_order1,
        user_id : data1?.user_id,
        product_id : data1?.product_id,
        seler_id : data1?.seler_id,
        orders : data1?.orders,
    }
    console.log(obj);
    
    var data = await return_order.create(obj);
    var delete1 = await completeorder.findByIdAndDelete(_id);
    res.status(200).json({
        status:"success logding your pending order",
        data1,
        delete1,
        data
    })
}

// **********************************************user view product 
const product_view = async(req,res) => {
    var data = await product.find()
    res.status(200).json({
        status:"success",
        data
    })
}

// **********************************************user view product 
const search_product = async (req,res) => {
    let name = req.query
    console.log(name);
    var data = await product.find(name)

    res.status(200).json({
        status:"search page loadding success",
        data
    })
}

module.exports = {
    now_order,
    view_order,
    total_order,
    pending_order,
    complete_order,
    return1_order,
    product_view,
    search_product
}