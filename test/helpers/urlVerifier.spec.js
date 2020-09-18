const { getValidUrls, isValidUrl } = require('../../src/helpers/urlVerifier');

describe('isValid()', () => {
  test('should return true for valid urls', () => {
    const result = isValidUrl('https://google.com');

    expect(result).toBe(true);
  });

  test('should return true for invalid urls', () => {
    const result = isValidUrl('1234');

    expect(result).toBe(false);
  });
});

describe('getValidUrls()', () => {
  test('should return an array of only valid urls', () => {
    const result = getValidUrls(['1234', 'yahoo.co.uk', 123, 'https://google.com']);

    expect(result).toEqual(['yahoo.co.uk', 'https://google.com']);
  });
});
