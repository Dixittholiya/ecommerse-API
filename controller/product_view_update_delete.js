var product = require("../model/seler_product_Model");

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
        console.log("seler id = "+seller_id);
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
    let id1 = req.params.id
    let data = await product.findByIdAndDelete(id1)
    res.status(200).json({
        status:"delete success",
        data
    })
}

module.exports = {
    product_view,
    product_update,
    delete_product
}