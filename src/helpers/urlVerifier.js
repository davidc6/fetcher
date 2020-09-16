const URL_REGEX = /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;

const verifyUrl = (url) => {
  const regex = new RegExp(URL_REGEX);
  const isValidUrl = regex.test(url);

  return isValidUrl;
};

const getValidUrls = (urls) => {
  if (!Array.isArray(urls)) {
    throw Error('Invalid input type. Please provide an array of urls.');
  }

  return urls.filter((url) => verifyUrl(url));
};

module.exports = {
  getValidUrls,
  isValid: verifyUrl,
};
