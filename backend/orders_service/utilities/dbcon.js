const mongoose = require('mongoose');

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env;

// const options = {
//   useNewUrlParser: true,
//   reconnectTries: Number.MAX_VALUE,
//   connectTimeoutMS: 10000,
// };

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}?authMechanism=DEFAULT&tls=false`;

// mongoose.connect(url, options).then( function() {
mongoose.connect(url).then( function() {
  console.log('MongoDB is connected');
})
  .catch( function(err) {
  console.log(err);
});