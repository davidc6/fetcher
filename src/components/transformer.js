const toOK = (req, res) => {
  if (req.client === "request") {
    return {}
  }

  // axios
  return {
    status: res.status,
    state: "ok",
    url: req.url.url,
    required: req.url.required,
    data: res.data,
  }
}

const toError = (req, res) => {
  if (!req.url.isValidUrl) {
    return {
      status: null,
      state: "error",
      message: req.url.message || "Invalid URL",
      url: req.url.url,
      required: req.url.required,
      data: null,
    }
  }

  if (req.client === "request") {
    return {}
  }

  // axios
  return {
    status: res.status,
    state: "error",
    message: `${res.toJSON().message}.`,
    url: req.url.url,
    required: req.url.required,
    data: null,
  }
}

module.exports = { toOK, toError }
