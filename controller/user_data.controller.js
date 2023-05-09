var user = require("../model/user_register.Model");
var userCard = require("../model/user_card_Model");
var product = require("../model/seler_product.Model");
const bcrypt = require('bcrypt');


var user_id = "";

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
    console.log("ok");
    const obj = {
        name:req.body.name,
        email:req.body.email,
        password:spassword,
        mobile:req.body.mobile,
    }
    const data = await user.create(obj)
            res.status(200).json({
                status:"seler data success full add",
                data
            })
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


// **********************************************add user
// const add_user = async(req,res) => {
//     var data = await user.create(req.body)
    
//     res.status(200).json({
//         status:"success",
//         data
//     })
// }

// **********************************************login user
// const user_login = async(req,res) => {
//     console.log("ok");
//     var data = await user.find({email:req.body.email})
//     console.log("data := "+data);
//     if (data[0].password == req.body.password) {
//         res.status(200).json({
//             status:"success full login",
//             data
//         })
//     }
//     else{
//         res.status(200).json({
//             status:"not found data",
//         })
//     }
// }



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

// **********************************************user update cards
const deleteCard = async(req,res) => {
    let id1 = req.params.id
    var data = await userCard.findOneAndDelete(id1);
    res.status(200).json({
        status:"success",
        data
    })
}



module.exports = {
    add_user,
    user_login,
    user_logout,
    add_card,
    viewCard,
    updateCard,
    deleteCard
}