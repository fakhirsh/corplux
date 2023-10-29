const express=require('express')
const router=express.Router()
const ProductController = require('../controllers/ProductController');
router.get("/",async (req,res)=>{
    const data = await ProductController.getProducts();
    console.log('route data: ', data);
    res.send(data)
})
router.post("/",async(req,res)=> {
    console.log("post data:  req.body", req.body)
    const data = await ProductController.createProducts(req.body);
    console.log('route data: ', data);
    res.send(data)
})
router.patch("/",async(req,res)=> {
    console.log("patch data:  req.body", req.body)
    const data = await ProductController.createProducts(req.body);
    console.log('route data: ', data);
    res.send(data)
})
module.exports = router;