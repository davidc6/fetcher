# URL Fetcher (fetcher)

:construction::construction_worker: This repo is updated frequently :construction::construction_worker:

`Promise` based url fetcher library.

This library makes concurrent requests to the provided urls and returns an array of objects of either successfully resolved or rejected promises that contain response payload. This library does not use `Promise.allSettled` (uses a [shim](https://www.npmjs.com/package/promise.allsettled) instead) yet as this method is only available from Node 12.9.0 onwards.

The source code for `fetcher` is written in a functional programming paradigm and favours small functions and function composition.

## Installing

Pull the repo and link locally using `npm link url-fetcher`. (The library is not published to npm yet).

## Example

```javascript
const fetcher = require('url-fetcher');

const urls = [
  'https://google.co.uk',
  'https://bbc.co.uk',
  'https://www.youtube.com'
];

fetcher
  .get(urls)
  .then(res => res)
```

## Tests

To run test:

```js
npm run test
```

This library uses Jest testing framework. Jest is a lightweight and fast library that focuses on simplicity. It provides a lot of functionality required for testing out of the box (mocking, stub, etc.).

## API

**fetcher.get(urls)** - accepts an array of urls to fetch. If any other data type is passed in, an error will be thrown.

## Response Schema

The response schema will always contain an array of objects.

```javascript
[
  {
    // status of the response, this can either be:
    // 'ok' - for successful requests
    // 'error' - for failed requests
    status: 'ok',
    // request url
    url: 'https://google.co.uk',
    // this property will only be included in the response in case of a failed request
    message: 'error occurred',
    // response payload
    // could contain either actual response payload or null in case of error
    data: {}
  }
]
```

## Future improvements (TODOs)

- Introduce "chunking" (divide and conquer technique) for processing large arrays. For instance, if an array of 100 urls is passed in then instead of making 100 requests at once (concurrently), the mechanism will make 10 requests at a time (10 times), combine results and return as a single array.

- [WIP] Allow a request config to be passed in on initialisation. For example:

```javascript
const urlFetcher = require('url-fetcher');

const urls = [
  'https://google.co.uk',
  'https://bbc.co.uk',
  'https://www.youtube.com'
];

const fetcher = urlFetcher({ timeout: 2000, header: { accept: 'application/json' } });

fetcher
  .get(urls)
  .then(res => res)
```

- Abstract HTTP request client out. At the moment, the library is coupled to axios. This can be achieved by either passing in a configured HTTP client on initialisation or by providing several pre-configured options in the library itself.

- Enable the library to accept a single url (as a string data type) rather than an array of urls.

- Specify response data structure e.g. { response, status }

- Add TypeScipt
