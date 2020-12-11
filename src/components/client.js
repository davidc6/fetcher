const axios = require("axios")
const R = require("ramda")
const F = require("fluture")
const { toOK, toError } = require("./transformer")

const DEFAULT_TIMEOUT = 3000

const createClient = (reqConfig) => {
  if (reqConfig.client === "request") {
    return {}
  }

  // axios - default
  const config = {
    timeout: DEFAULT_TIMEOUT,
    ...R.omit(["client", "concurrencyNumber"], reqConfig),
  }

  return axios.create(config)
}

const createUrlObject = (url) => ({
  ...url,
  required: url.required !== false,
})

const createRequestObject = R.curry((config, url) => {
  const client = createClient(config)

  return {
    url: createUrlObject(url),
    client: config.client,
    future: F.encaseP(client.get)(url.url),
  }
})

const createRequestConfig = R.curry((clientConfig, urls) =>
  R.map(createRequestObject(clientConfig), urls),
)

const left = R.curry((url, res) => toError(url, res)) // failure
const right = R.curry((url, res) => toOK(url, res)) // success

module.exports = { createRequestConfig, left, right }
