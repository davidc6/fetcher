const allSettled = require('promise.allsettled');
const compose = require('lodash.compose');
const { getValidUrls } = require('./helpers/urlVerifier');
const { getResponseAsync } = require('./components/fetcher');
const { transformResponse } = require('./components/transformer');

const allSettledAsync = (promises) => allSettled(promises);

const getDataForUrls = async (urls) => {
  const responseAsync = compose(allSettledAsync, getResponseAsync, getValidUrls);

  return transformResponse(await responseAsync(urls));
};

module.exports = { fetch: getDataForUrls };
