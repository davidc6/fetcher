const toStatusOK = (url, data) => ({
  status: 'ok',
  url,
  data,
});

const toStatusError = (url, message) => ({
  status: 'error',
  message: `${message}.`,
  url,
  data: null,
});

const toStatusUnknown = () => ({
  status: 'unknown',
  message: 'Cannot establish the status of a promise.',
  url: null,
  data: null,
});

const transform = (responses) => {
  if (!Array.isArray(responses)) {
    return [];
  }

  return responses.map((response) => {
    if (response.status === 'fulfilled') {
      const { value: { config, data } } = response;

      return toStatusOK(config.url, data);
    } if (response.status === 'rejected') {
      const { reason: { config, message } } = response;

      return toStatusError(config.url, message);
    }
    return toStatusUnknown();
  });
};

module.exports = transform;
