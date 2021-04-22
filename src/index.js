const { curry, compose, map, propOr } = require("ramda")
const { coalesce, parallel, promise } = require("fluture")

const { getValidUrls } = require("./helpers/urlVerifier")
const { createRequestConfig, left, right } = require("./components/client")

const getDataForUrls = curry((config, urls) => {
  /**
   * coalesce - bring both branches together into a whole
   * left - failure / sad path
   * right - success / happy path
   */
  const control = (urlObj) => coalesce(left(urlObj))(right(urlObj))

  /**
   * Function composition
   * 
   * 1. validate urls
   * 2. create request config { url: object = {}, futures: [] = [], client: string = '' }
   * 3. prepare data structures and computations
   */
  const prepareRequests = compose(
    map((urlObj) => control(urlObj)(urlObj.future)),
    createRequestConfig(config),
    getValidUrls,
  )

  /**
   * parallel - runs computations
   * a Promise gets returned instead of Future to make outcome "thenable" for clients
   */
  return promise(
    parallel(propOr(1, "concurrencyNumber", config))(prepareRequests(urls))
  )
})

module.exports = {
  get: getDataForUrls,
}
