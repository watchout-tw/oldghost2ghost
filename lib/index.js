import dotenv from 'dotenv';
dotenv.config();

const axios = require('axios'); // Make a request for a user with a given ID


axios.get(`${process.env.URL_OLD_GHOST}/content/posts/`).then(function (response) {
  // handle success
  console.log(response);
}).catch(function (error) {
  // handle error
  console.log('ERROR:',error);
}).finally(function () {// always executed
});