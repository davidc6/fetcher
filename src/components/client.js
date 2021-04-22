const axios = require("axios")
const { curry, omit, map } = require("ramda")
const { encaseP } = require("fluture")
const { toOK, toError } = require("./transformer")

const DEFAULT_TIMEOUT = 2000

const getTimeout = curry((url, globalConfig) => {
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
    ...omit(["client", "concurrencyNumber"], reqConfig),
  }

  return axios.create(config)
}

const createUrlObject = (url) => ({
  ...url,
  required: url.required !== false,
})

const createRequestObject = curry((config, url) => {
  const client = createClient(config, url)

  return {
    url: createUrlObject(url),
    client: config.client,
    future: encaseP(client.get)(url.url),
  }
})

const createRequestConfig = curry((clientConfig, urls) =>
  map(createRequestObject(clientConfig), urls),
)

// handle response
const left = curry((url, res) => toError(url, res)) // failure
const right = curry((url, res) => toOK(url, res)) // success

module.exports = { createRequestConfig, left, right }
