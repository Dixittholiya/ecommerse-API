var seler = require("../model/seler_register.Model");
const bcrypt = require('bcrypt');
const config = require("../config/config");
var jwt = require('jsonwebtoken');
var product = require("../model/seler_product_Model");

var seller_id = "" ;
// const logoutData = async(data1) => {
//     const data = await data1
//     return data
// }

const createToken = async(id) => {
    try {
        const token = await jwt.sign({_id:id},config.secret_jwt);
        return token
    } catch (error) {
        res.status(400).json({
            status:"token error"
        })
    }
}

const securePassword = async(password) => {
    try {
        const passwordHash =  await bcrypt.hash(password,10);
        return passwordHash;
    } catch (error) {
        res.status(200).json({
            status:"invelid"
        })
    }
}

// **************************************************** add seler 
const add_seler = async(req,res) => {
    try {
    var pending0 = "0"
    var status0 = "0"
    const spassword = await securePassword(req.body.password);
    const obj = {
        name:req.body.name,
        email:req.body.email,
        password:spassword,
        mobile:req.body.mobile,
        pending:pending0,
        status:status0,
    }
    var seler_data = await seler.find({email:req.body.email})
        if (seler_data == "") {
            const data = await seler.create(obj)
            res.status(200).json({
                status:"seler data success full add",
                data
            })
        } 
        else{
            res.status(200).json({
                status:"your email is already exist..."
            })
        }
    } catch (error) {
        res.status(200).json({
            status:"error"
        })
    }
    
    }
    

// **************************************************** seler login 
const login_seler = async(req,res) => {

    try {

    if(seller_id=="")
    {
        
        var seller_data = await seler.find({"email":req.body.email});

        if(seller_data.length!=0)
        {
            bcrypt.compare(req.body.password, seller_data[0].password, function(err, result) {
                    if(result==true)
                    {
                        seller_id = seller_data[0].id;

                        res.status(200).json({
                            status:"Seller Login Successfull"
                        })
                    }
                    else
                    {
                        res.status(200).json({
                            status:"Your Password do not match"
                        })
                    }
            });
        }
        else{
            res.status(200).json({
                status:"Your email do not match"
            })
        }
    }
    else
    {
        res.status(200).json({
            status:"plzz Logout Current Login Account"
        })
    }
    } catch (error) {
        res.status(200).json({
            status:error
        })
    }
}

// **************************************************************** seler login
 const Logout = async(req,res) => {
   
    seller_id == "";

    res.status(200).json({
        status:"Seller Logout"
    })
    
}

// var product = require("../model/seler_product_Model");

// ******************************************product view 
const product_view = async(req,res) => {
    var data = await product.find().populate("seler_id")
    
    res.status(200).json({
        status:"success",
        data
    })
}

// ******************************************product update
const product_update = async(req,res) => {
    try {
        if (seller_id == "") {
            res.status(200).json({
                status:"please login seler"
            })
        }else{
            var id1 = req.params.id
            var title = req.body.title
            var price = req.body.price
            var discount = req.body.discount
            var rating = req.body.rating
            var stock = req.body.stock
            var brand = req.body.brand
            var category = req.body.category
            var image = req.body.image
            // var data = await product.findByIdAndUpdate({_id : id1},{title : title},{price : price},{discount : discount},{rating : rating},{stock : stock},{brand : brand},{category : category},{image : image},{new : true})
            var data = await product.findByIdAndUpdate({_id : id1},{title : title})
            var data = await product.findByIdAndUpdate({_id : id1},{price : price})
            var data = await product.findByIdAndUpdate({_id : id1},{discount : discount})
            var data = await product.findByIdAndUpdate({_id : id1},{rating : rating})
            var data = await product.findByIdAndUpdate({_id : id1},{stock : stock})
            var data = await product.findByIdAndUpdate({_id : id1},{brand : brand})
            var data = await product.findByIdAndUpdate({_id : id1},{category : category})
            var data = await product.findByIdAndUpdate({_id : id1},{image : image})
            
            res.status(200).json({
                status:"success",
                data
            })
        }
   
    } catch (error) {
        res.status(200).json({
            status:"error"
        })
    }
    
}


// ******************************************product delete
const delete_product = async (req,res) =>{
    try {
        if (seller_id == "") {
            res.status(200).json({
                status:"please login seler"
            })
        }
        else{
            let id1 = req.params.id
            let data = await product.findByIdAndDelete(id1)
            res.status(200).json({
                status:"delete success",
                data
            })
        }
    } catch (error) {
        res.status(200).json({
            status:"error"
        })
    }
    
}



// module.exports = {
//     product_view,
//     product_update,
//     delete_product
// }



















module.exports = {
    add_seler,
    login_seler,
    Logout,
    product_view,
    product_update,
    delete_product
}