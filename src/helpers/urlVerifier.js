const VALID_URL_REGEX = /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/

const isValidUrl = (url) => {
  const regex = new RegExp(VALID_URL_REGEX)
  return regex.test(url.url) ? { ...url, isValidUrl: true } : { ...url, isValidUrl: false }
}

const getValidUrls = (urls) => {
  if (!Array.isArray(urls)) {
    return [
      {
        url: `${urls}`,
        required: false,
        message: "Invalid input. Please provide an array of valid urls.",
        isValidUrl: false,
      },
    ]
  }

  return urls.filter((url) => isValidUrl(url))
}

module.exports = {
  getValidUrls,
  isValidUrl,
}
