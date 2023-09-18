const {Product} = require('../models/Product')
const getProducts= async function(){
    const data = await Product.find({});
    console.log(data)
    return data;
}
const createProducts= async function(){
    const data = await Product.create({ size: 'small' });
    console.log(data)
    return data;
}










module.exports={
    getProducts,
    createProducts

}