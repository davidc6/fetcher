const axios = require('axios');
const urlFetcher = require('../src/index');

jest.mock('axios');

describe('urlFetcher', () => {
  const urlFixture = 'https://google.co.uk';
  const dataFixture = [
    { objectOne: 'some-data' },
    { objectTwo: 'some-more-data' },
  ];

  test('fetch() should return a valid data structure if promise resolves', async () => {
    const fixture = {
      data: dataFixture,
      config: { url: urlFixture },
    };

    axios.get.mockResolvedValue(fixture);

    const response = await urlFetcher.fetch([urlFixture]);

    expect(axios.get).toHaveBeenCalledWith('https://google.co.uk', { timeout: 2000 });
    expect(response).toEqual([{ status: 'ok', url: 'https://google.co.uk', data: dataFixture }]);
  });

  test('fetch() should return a valid data structure if promises rejects', async () => {
    const fixture = {
      data: dataFixture,
      config: { url: urlFixture },
      message: 'some error',
    };

    axios.get.mockRejectedValue(fixture);

    const response = await urlFetcher.fetch([urlFixture]);

    expect(axios.get).toHaveBeenCalledWith('https://google.co.uk', { timeout: 2000 });
    expect(response).toEqual([{
      status: 'error', url: 'https://google.co.uk', message: 'some error.', data: null,
    }]);
  });

  test('fetch() should throw if a data type other than array is passed in', async () => {
    function fetch() {
      return urlFetcher.fetch('some-data');
    }

    await expect(fetch()).rejects.toThrow();
  });
});
