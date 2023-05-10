var express = require('express');
var {add_seler,login_seler,Logout,product_view,product_update,delete_product} = require("../controller/seler_data.controllr")
var {add_product} = require("../controller/seler_product_controller")
// var {product_view,product_update,delete_product} = require("../controller/product_view_update_delete")
const {view_order,total_order,pending_order,complete_order} = require("../controller/order_controller")

var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// *********************************************add seler
router.post("/add_seler",add_seler);

// *********************************************seler login
router.post("/seler_login",login_seler)

// *********************************************seler logout
router.get("/logout",Logout)

// *********************************************add product
router.post("/add_product",add_product)

// *********************************************view product
router.get("/view_product*",product_view)

// *********************************************product update
router.put("/*update_product*/:id",product_update)

// *********************************************product delete
router.delete("/delete_product*/:id",delete_product)



// *******************************************seler view order
router.get("/order_view/",view_order);

// *******************************************seler total order
router.get("/total_order/",total_order);

// *******************************************seler pending order
router.get("/pending_order/",pending_order);

// *******************************************seler pending order
router.post("/complete_order/:id",complete_order);


module.exports = router;