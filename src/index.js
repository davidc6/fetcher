const allSettled = require('promise.allsettled');
const compose = require('lodash.compose');
const { getValidUrls } = require('./helpers/urlVerifier');
const { getResponseAsync } = require('./components/fetcher');
const { transform } = require('./components/transformer');

const allSettledAsync = (promises) => allSettled(promises);

const getDataForUrls = async (urls) => {
  // compose is an alias of flowRight - https://github.com/lodash/lodash/blob/4.17.15-npm/flowRight.js
  const get = compose(allSettledAsync, getResponseAsync, getValidUrls);

  return transform(await get(urls));
};

module.exports = { fetch: getDataForUrls };
