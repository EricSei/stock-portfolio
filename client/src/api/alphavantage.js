//import axios from 'axios';
const axios = require('axios');

export default axios.create({
  baseURL: 'https://www.alphavantage.co'
});
