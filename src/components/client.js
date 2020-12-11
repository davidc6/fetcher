const axios = require("axios")
const R = require("ramda")
const F = require("fluture")
const { toOK, toError } = require("./transformer")

const DEFAULT_TIMEOUT = 2000

const getTimeout = R.curry((url, globalConfig) => {
  if (url.timeout) return url.timeout // individual timeout take priority
  if (globalConfig.timeout) return globalConfig.timeout // then global
  return DEFAULT_TIMEOUT // last is the default
})

const createClient = (reqConfig, url) => {
  if (reqConfig.client === "request") {
    return {}
  }

  // axios - default
  const config = {
    timeout: getTimeout(url, reqConfig),
    ...R.omit(["client", "concurrencyNumber"], reqConfig),
  }

  return axios.create(config)
}

const createUrlObject = (url) => ({
  ...url,
  required: url.required !== false,
})

const createRequestObject = R.curry((config, url) => {
  const client = createClient(config, url)

  return {
    url: createUrlObject(url),
    client: config.client,
    future: F.encaseP(client.get)(url.url),
  }
})

const createRequestConfig = R.curry((clientConfig, urls) =>
  R.map(createRequestObject(clientConfig), urls),
)

// handle response
const left = R.curry((url, res) => toError(url, res)) // failure
const right = R.curry((url, res) => toOK(url, res)) // success

module.exports = { createRequestConfig, left, right }
