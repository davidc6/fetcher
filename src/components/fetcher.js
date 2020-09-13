const axios = require('axios');

const fetch = (url) => axios.get(url, { timeout: 3000 });

const getResponsePromises = (urls) => urls.map((url) => fetch(url));

module.exports = {
  getResponsePromises,
};
