const R = require("ramda")
const F = require("fluture")
const { getValidUrls } = require("./helpers/urlVerifier")
const { createRequestConfig, left, right } = require("./components/client")

const getDataForUrls = R.curry((config, urls) => {
  // create an array of Futures
  const request = R.compose(createRequestConfig(config), getValidUrls)

  // map over Futures and process (success or failure)
  const processUrls = request(urls).map((urlObj) =>
    F.coalesce(left(urlObj))(right(urlObj))(urlObj.future),
  )

  const concurrencyNumber =
    config.concurrencyNumber && typeof config.concurrencyNumber === "number"
      ? config.concurrencyNumber
      : 1

  // make 5 requests in parallel
  const parallelFutures = F.parallel(concurrencyNumber)(processUrls)

  // return Promise
  return F.promise(parallelFutures)
})

module.exports = {
  get: getDataForUrls,
}
