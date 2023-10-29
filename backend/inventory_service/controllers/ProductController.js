const {Product} = require('../models/Product')
const getProducts= async function(){
    const data = await Product.find({});
    console.log('db data for product : : ',data)
    return data;
}
const createProducts= async function(){
    const data = await Product.create({ size: 'small' });
    console.log('db data for product : : ',data)
    return data;
}
const updateProducts= async function(body){
    filter =  body
    const data = await Product.findOneAndUpdate(body, { size: 'small' });
    console.log('db data for product : : ',data)
    return data;
}









module.exports={
    getProducts,
    createProducts,
    updateProducts

}