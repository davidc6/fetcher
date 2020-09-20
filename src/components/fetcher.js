const axios = require('axios');

const requestConfig = { timeout: 3000 };

const getResponseAsync = (urls) => urls.map((url) => axios.get(url, requestConfig));

module.exports = { getResponseAsync };
