const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const port = 8080;
const db = require('./utilities/dbcon');
const { default: mongoose } = require('mongoose');
const ProductsRoute =  require('./routes/ProductsRoute');

app.use(cors());
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// app.use(cors({
//   origin: 'http://localhost:3001',
//   credentials: true
// }));

app.use("/products",ProductsRoute)
app.post('/', jsonParser,  (req, res) => {
  console.log("req: body ", JSON.stringify(req.body));
  res.status(200).send('hello world');
});

app.listen(port, () => {
  console.log(`Example app listening on port 8080`);
});