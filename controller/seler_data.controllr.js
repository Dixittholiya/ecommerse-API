var seler = require("../model/seler_register.Model");
const bcrypt = require('bcrypt');
const config = require("../config/config");
var jwt = require('jsonwebtoken');

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
    const data = await seler.create(obj)
    res.status(200).json({
        status:"seler data success full add",
        data
    })
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


// let GLOBALa;

// **************************************************************** add seler 
// const add_seler = async(req,res) => {
//     var datas = req.body
//     var pending0 = "0"
//     var status0 = "0"
//     const viewdatas = {
//         pending : pending0,
//         status : status0,
//         name : datas?.name,
//         email : datas?.email,
//         password : datas?.password,
//         mobile : datas?.mobile,
//     }
//     console.log(viewdatas);
//     var data = await seler.create(viewdatas)
    
//     res.status(200).json({
//         status:"success",
//         data
//     })
// }

// **************************************************************** seler login
// const login_seler = async(req,res) => {
//     var data = await seler.find({email:req.body.email})
//     GLOBALa = data
//     console.log(GLOBALa);
//     if (data[0].password == req.body.password) {
//         var status0 = "1"
//         var id1 = data[0].id
//         var data1 = await seler.findByIdAndUpdate({ _id: id1 }, { status: status0 });
//         res.status(200).json({
//             status:"success full login",
//             data1
//         })
//     }
//     else{
//         res.status(200).json({
//             status:"not found data",
//         })
//     }
//     return GLOBALa;
// }















// **************************************************************** seler logout
// const logout_seler = async(req,res) => {
    // var data = GLOBALa
    // loginAndLogout = data
    // console.log("logout seler :- "+data);
    // var data = await seler.find({email:req.body.email})
    // if (data[0].password == req.body.password) {
    //     var status0 = "1"
    //     console.log("data"+data);
    //     var id1 = data[0].id
    //     console.log(id1);
    //     var data1 = await seler.findByIdAndUpdate({ _id: id1 }, { status: status0 });
    //     res.status(200).json({
    //         status:"success full login",
    //         data
    //     })
    // }
    // else{
    //     res.status(200).json({
    //         status:"not found data",
    //     })
    // }
// }



module.exports = {
    add_seler,
    login_seler,
    Logout
}