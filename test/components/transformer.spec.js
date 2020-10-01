const { transformResponse } = require('../../src/components/transformer');

describe('transformer', () => {
  const mockFullfilledPromise = {
    status: 'fulfilled',
    value: {
      config: { url: 'some-url' },
      data: { propOne: 'prop-one' },
    },
  };

  const mockRejectedPromise = {
    status: 'rejected',
    reason: {
      config: { url: 'some-url' },
      message: 'Some error',
    },
  };

  test('should transform a fulfilled promise input into a valid data structure', () => {
    const mockData = [mockFullfilledPromise];

    expect(transformResponse(mockData)).toEqual([{
      status: 'ok',
      url: 'some-url',
      data: { propOne: 'prop-one' },
    }]);
  });

  test('should transform a rejected promise input into a valid data structure', () => {
    const mockData = [mockRejectedPromise];

    expect(transformResponse(mockData)).toEqual([{
      status: 'error',
      url: 'some-url',
      message: 'Some error.',
      data: null,
    }]);
  });

  test('should transform a mixture of fulfilled and rejected promise input into a valid data structure', () => {
    const mockInput = [mockFullfilledPromise, mockRejectedPromise];

    expect(transformResponse(mockInput)).toEqual([
      {
        status: 'ok',
        url: 'some-url',
        data: { propOne: 'prop-one' },
      },
      {
        status: 'error',
        url: 'some-url',
        message: 'Some error.',
        data: null,
      },
    ]);
  });

  test('transformer should return a valid data structure if input status is unknown', () => {
    const mockInput = {
      status: 'test',
      reason: {
        config: { url: 'some-url' },
        message: 'Some error',
      },
    };
    const mockData = [mockInput];

    expect(transformResponse(mockData)).toEqual([{
      status: 'unknown',
      url: null,
      message: 'Cannot establish the status of a promise.',
      data: null,
    }]);
  });
});
