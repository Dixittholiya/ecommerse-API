var product = require("../model/seler_product_Model");


const add_product = async(req,res) => {
    var data = await product.create(req.body)

    res.status(200).json({
        status:"success",
        data
    })
}

module.exports = {
    add_product
}