var admin = require("../model/add_admin_Model");
var user = require("../model/user_register.Model");
var seler = require("../model/seler_register.Model");
var selerProduct = require("../model/seler_product_Model");
var order = require("../model/order_Model");
var confirmationseler = require("../model/confirmation_seler_Model");
var blog = require("../model/blog_user_and_seler")
// var user = require("../model/user_register.Model")

// ******************************************************* add admin 
const addAdmin = async(req,res) => {
    
    var data = await admin.create(req.body)
    res.status(200).json({
        status:"admin success full register",
        data
    })
}

// ******************************************************* admin view user delails
const adminUserDetails = async(req,res) => {
    var data = await user.find()
    
    res.status(200).json({
        status:"success",
        data
    })
}

// ******************************************************* admin view seler delails
const adminSelerDetails = async(req,res) => {
    var data = await seler.find()
    
    res.status(200).json({
        status:"success",
        data
    })
}

// ******************************************************* admin view seler product delails
const adminSelerProductDetails = async(req,res) => {
    var data = await selerProduct.find()
    
    res.status(200).json({
        status:"success",
        data
    })
}

// ******************************************************* admin view total order delails
const adminTotalOrderDetails = async(req,res) => {
    var data = await order.find()
    
    res.status(200).json({
        status:"success",
        data
    })
}

// ******************************************************* Admin view total user register
const adminTotalUserRegister = async(req,res) => {
    var data = await user.find()
    
    res.status(200).json({
        status:"success",
        data
    })
}

// ******************************************************* Admin view total seler register
const adminTotalSelerRegister = async(req,res) => {
    var data = await seler.find()
    
    res.status(200).json({
        status:"success",
        data
    })
}

// ******************************************************* Admin view total seler register pending
const adminViewSelerRegisterPending = async(req,res) => {
    let query = req.query
    var data = await seler.find(query)
    
    res.status(200).json({
        status:"success",
        data
    })
}

// ******************************************************* Admin seler pending order confirmation
const adminSelerPendingOrderConfirmation = async(req,res) => {
    let _id = req.body._id
    console.log(_id);
    let data = await seler.findById(_id)
    console.log(data);
    let confirmation = "1"
    let obj = {
        name : data?.name,
        email : data?.email,
        password : data?.password,
        mobile : data?.mobile,
        confirmation : confirmation
    }
    var data1 = await confirmationseler.create(obj);
    var delete1 = await seler.findByIdAndDelete(_id);
    res.status(200).json({
        status:"success",
        data1
    })
}

// ******************************************************* Admin seler pending order confirmation
const adminViewSelerLogin = async(req,res) => {
    let query = req.query
    var data = await seler.find(query)

    res.status(200).json({
        status:"success view login seler",
        data
    })

}

const blog_seler = async(req,res) => {
    try {
    let _id = req.body._id
    var findSeler = await confirmationseler.findById(_id);
    console.log(findSeler);
    let idBlog = "blog"
    let obj = {
        name : findSeler?.name,
        email : findSeler?.email,
        password : findSeler?.password,
        mobile : findSeler?.mobile,
        idBlog : idBlog
    }
    let data = await blog.create(obj);
    let delete1 = await confirmationseler.findByIdAndDelete(_id)
        res.status(200).json({
            status:"seler is blog",
            data
        })
    } catch (error) {
        res.status(200).json({
            status:"error"
        })
    }
    
}


module.exports = {
    addAdmin,
    adminUserDetails,
    adminSelerDetails,
    adminSelerProductDetails,
    adminTotalOrderDetails,
    adminTotalUserRegister,
    adminTotalSelerRegister,
    adminViewSelerRegisterPending,
    adminSelerPendingOrderConfirmation,
    adminViewSelerLogin,
    blog_seler
}
