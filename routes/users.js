var express = require('express');
const {add_user,user_login,user_logout} = require("../controller/user_data.controller");
const {now_order,return1_order,product_view,search_product} = require("../controller/order_controller");
const {add_card,viewCard,updateCard,deleteCard,forgetPasswordemail,setpassword} = require("../controller/user_data.controller")

var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
// *******************************************add user 
router.post("/add_user",add_user);

// *******************************************user login
router.post("/user_login",user_login);

// *******************************************user logout
router.post("/user_logout",user_logout);

// *******************************************user order
router.post("/order_now",now_order);

// *******************************************user return order
router.post("/return_order/:id",return1_order);

// *******************************************user view product
router.get("/product_view/",product_view);

// *******************************************user search product
router.get("/search_product/",search_product);

// *******************************************user add card
router.post("/add_card/:id",add_card);

// *******************************************user view card
router.get("/view_Card/",viewCard);

// *******************************************user update card
router.put("/update_card/:id",updateCard);

// *******************************************user delete card
router.delete("/delete_card/:id",deleteCard);

// *******************************************user forget passwordemail
router.post("/user_forget_passwordemail/",forgetPasswordemail);

// *******************************************user forget passwordemail
router.post("/user_set_forget_password/",setpassword);




module.exports = router;
