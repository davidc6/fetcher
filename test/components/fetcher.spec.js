const axios = require('axios');
const fetcher = require('../../src/components/fetcher');

jest.mock('axios');

describe('fetcher', () => {
  test('should fetch successfully', async () => {
    const mockData = { propOne: 'prop-one' };
    axios.get.mockImplementation(() => Promise.resolve(mockData));

    await expect(fetcher.getResponseAsync(['a', 'b'])[0]).resolves.toEqual(mockData);
    await expect(fetcher.getResponseAsync(['a', 'b'])[1]).resolves.toEqual(mockData);
  });
});
