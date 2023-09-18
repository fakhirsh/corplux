const mongoose = require('mongoose');

const schema = new mongoose.Schema({ name: String, size: String });
const Product = mongoose.model('Product', schema);
module.exports={Product};