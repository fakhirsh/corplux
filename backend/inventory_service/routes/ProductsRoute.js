const express=require('express')
const router=express.Router()
const ProductController = require('../controllers/ProductController');
router.get("/",(req,res)=>{
    const data = ProductController.getProducts();
    res.send(data)
})
router.post("/",(req,res)=> {
    const data = ProductController.createProducts();
    res.send(data)
})
module.exports = router;