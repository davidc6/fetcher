const allSettled = require('promise.allsettled');
const compose = require('lodash.compose');
const { getValidUrls } = require('./helpers/urlVerifier');
const { getResponsePromises } = require('./components/fetcher');
const transform = require('./components/transformer');

const settlePromises = (promises) => allSettled(promises);

const fetch = async (urls) => {
  // compose is an alias of flowRight - https://github.com/lodash/lodash/blob/4.17.15-npm/flowRight.js
  const res = compose(settlePromises, getResponsePromises, getValidUrls);

  return transform(await res(urls));
};

module.exports = {
  fetch: (urls) => fetch(urls),
};
