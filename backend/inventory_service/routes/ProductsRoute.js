const express=require('express')
const router=express.Router()
const ProductController = require('../controllers/ProductController');
router.get("/",async (req,res)=>{
    const data = await ProductController.getProducts();
    console.log('route data: ', data);
    res.send(data)
})
router.post("/",async(req,res)=> {
    const data = await ProductController.createProducts();
    console.log('route data: ', data);
    res.send(data)
})
module.exports = router;