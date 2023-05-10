var user = require("../model/user_register.Model");
var userCard = require("../model/user_card_Model");
var product = require("../model/seler_product_Model");
const bcrypt = require('bcrypt');
var express = require('express');
var nodemailer = require('nodemailer');


var user_id = "";
let random = Math.floor(Math.random() * 1000) + 1;

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

// **************************************************** add user 
const add_user = async(req,res) => {
    try {
        const spassword = await securePassword(req.body.password);
        const obj = {
            name:req.body.name,
            email:req.body.email,
            password:spassword,
            mobile:req.body.mobile,
        }
        var find_data = await user.find({email:req.body.email});
            if (find_data == "") {
                const data = await user.create(obj);
                res.status(200).json({
                    status:"user data success full add",
                    data
                })
            }
            else{
                res.status(200).json({
                    status:"your email is already exist...",
                })
            }

            
    } catch (error) {
        res.status(200).json({
            status:"invelid"
        })
    }
    
}


// **************************************************** seler login 
const user_login = async(req,res) => {

    try {
        console.log(user_id);
    if(user_id=="")
    {
        
        var user_data = await user.find({"email":req.body.email});

        if(user_data.length!=0)
        {
            bcrypt.compare(req.body.password, user_data[0].password, function(err, result) {
                    if(result==true)
                    {
                        user_id = user_data[0].id;

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
const user_logout = async(req,res) => {
   
    user_id == "";

    res.status(200).json({
        status:"Seller Logout"
    })
    
}



// **********************************************user add cards
const add_card = async(req,res) => {
    var _id = req.params.id
    console.log(_id);
    var data = await product.findById(_id);
    order = "1";
    const cardObj = {
        title1 : data?.title,
        price1 : data?.price,
        discount1 : data?.discount,
        discount1 : data?.discount,
        rating1 : data?.rating,
        stock1 : data?.stock,
        brand1 : data?.brand,
        category1 : data?.category,
        image1 : data?.image,
        order1 : order,
    }
    
    var cardData1 = await userCard.create(cardObj)
    res.status(200).json({
        status:"add card success full",
        data,
        cardData1
    })
}

// **********************************************user add cards
const viewCard = async(req,res) =>{
    var data = await userCard.find()
    res.status(200).json({
        status:"success card page loadding",
        data
    })
}

// **********************************************user update cards
const updateCard = async(req,res) =>{
    var id1 = req.params.id
    var order1 = req.body.order1
    var data = await userCard.findByIdAndUpdate({_id:id1},{order1:order1})
    res.status(200).json({
        status:"success card page loadding",
        data
    })
}

// **********************************************user delete cards
const deleteCard = async(req,res) => {
    let id1 = req.params.id
    var data = await userCard.findOneAndDelete(id1);
    res.status(200).json({
        status:"success",
        data
    })
}

// **********************************************user forget password email
const forgetPasswordemail = async(req,res,next) => {
    try {
        if (user_id == "") {
            
            console.log(random);
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: "dixittholiya96960@gmail.com",
                    pass: 'xnwgfwoqihanhsyk',
                }
            });
              
              var mailOptions = {
                from:"dixittholiya96960@gmail.com",
                to: req.body.Email,
                subject: 'Sending Email using Node.js',
                text: "random = "+random
              };
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            
              
        }
        else{
            res.status(400).json({
                status:"you are in login"
            })
        }
    } catch (error) {
        res.status(400).json({
            status:"error"
        })
    }
}

// **********************************************user forget password email
const setpassword = async(req,res) => {
    try {
        if (random == req.body.random) {
            var user_data = await user.find({"email":req.body.email});
            console.log(user_data);
            let password0 = req.body.password
            const objID = {
                _id : user_data[0]._id
            }
            let _id = objID._id
            console.log(_id);
            let update = await user.findByIdAndUpdate({_id:_id},{password:password0})


            res.status(200).json({
                status:"password is update success full",
                password0
            })
          }
    } catch (error) {
        res.status(200).json({
            status:"error"
        })
    }
}



module.exports = {
    add_user,
    user_login,
    user_logout,
    add_card,
    viewCard,
    updateCard,
    deleteCard,
    forgetPasswordemail,
    setpassword
}