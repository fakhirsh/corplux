const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
const port = 8080;

app.use(cors());
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// app.use(cors({
//   origin: 'http://localhost:3001',
//   credentials: true
// }));


app.post('/', jsonParser,  (req, res) => {
  console.log("req: body ", JSON.stringify(req.body));
  res.status(200).send('hello world');
});

app.listen(port, () => {
  console.log(`Example app listening on port 8080`);
  
})