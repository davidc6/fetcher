const R = require("ramda")
const F = require("fluture")
const { getValidUrls } = require("./helpers/urlVerifier")
const { createRequestConfig, left, right } = require("./components/client")

const getConcurrencyNumber = (config) =>
  config.concurrencyNumber && typeof config.concurrencyNumber === "number"
    ? config.concurrencyNumber
    : 1

const getDataForUrls = R.curry((config, urls) => {
  // sad and happy paths
  const control = (urlObj) => F.coalesce(left(urlObj))(right(urlObj))
  /**
   * 1. validate urls
   * 2. create request config { url: object = {}, futures: [] = [], client: string = '' }
   * 3. prepare data structures and computations
   */
  const prepareRequests = R.compose(
    R.map((urlObj) => control(urlObj)(urlObj.future)),
    createRequestConfig(config),
    getValidUrls,
  )

  // parallel function runs computations
  // we return Promise instead of Future to make outcome "thenable" for clients
  return F.promise(F.parallel(getConcurrencyNumber(config))(prepareRequests(urls)))
})

module.exports = {
  get: getDataForUrls,
}
