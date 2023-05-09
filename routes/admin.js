var express = require('express');
var {addAdmin,adminUserDetails,adminSelerDetails,adminSelerProductDetails,adminTotalOrderDetails,adminTotalUserRegister,adminTotalSelerRegister,adminViewSelerRegisterPending,adminSelerPendingOrderConfirmation,adminViewSelerLogin} =require("../controller/admin_data_controller")
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// ********************************************************** add Admin
router.post("/add_admin",addAdmin)

// ********************************************************** Admin view user details
router.get("/admin_view_user_details",adminUserDetails)

// ********************************************************** Admin view seler details
router.get("/admin_view_seler_details",adminSelerDetails)

// ********************************************************** Admin view seler product details
router.get("/admin_view_seler_product_details",adminSelerProductDetails)

// ********************************************************** Admin view total order
router.get("/admin_view_Total_order_details",adminTotalOrderDetails)

// ********************************************************** Admin view total user register
router.get("/admin_view_total_user_login",adminTotalUserRegister)

// ********************************************************** Admin view total seler register
router.get("/admin_view_total_seler_login",adminTotalSelerRegister)

// ********************************************************** Admin view total seler register pending
router.get("/admin_view_total_seler_pending/",adminViewSelerRegisterPending)

// ********************************************************** Admin seler pending order confirmation
router.post("/admin_seler_pending_order_confirmation/:id",adminSelerPendingOrderConfirmation)

// ********************************************************** Admin view seler login 
router.post("/admin_view_seler_login/",adminViewSelerLogin)

module.exports = router;
