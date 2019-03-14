# Normalize JSON:API Response

![Logo](/img/logo.png)

[![npm version](https://img.shields.io/npm/v/normalize-json-api-response.svg)](https://www.npmjs.com/package/normalize-json-api-response)
[![npm downloads](https://img.shields.io/npm/dt/normalize-json-api-response.svg)](https://www.npmjs.com/package/normalize-json-api-response)
[![license](https://img.shields.io/npm/l/normalize-json-api-response.svg)](https://github.com/SinestroWhite/Normalize-JSON-API/blob/master/LICENSE)

> *Normalize JSON:API Response (NJAR) is not only designed to simplify JSON:API responses but also to make them easy developer friendly.*
>
> *Created by Sinestro White with :heart: !*

## Features

- **Easy installation and integration** - No complicated actions
- **JSON:API simplification**
- **No need to correct the normalized response**
- **Front-end design friendly** - Makes response data easy to display with a for-loop
- **No schema required**
- **No dependencies** 👌

## Installation

Using [npm](https://www.npmjs.com/package/normalize-json-api-response):

```
  $ npm i normalize-json-api-response
```

Then, using a module bundler that supports either CommonJS or ES2015 modules, such as [webpack](https://github.com/webpack/webpack):

```js
  import normalize from 'normalize-json-api-response';
```

## Usage

### Basic Example

When working with the JSON:API specification, the response body of any request is optimized and it can get difficult to 
do computations. The main information is contained in the "data" property but if there are relations to other tables they
are put in the "included" property.

```js
    //Example server response
    const data = {
      data: {
        type: "articles",
        id: "1",
        attributes: {
          title: "JSON:API paints my bikeshed!"
        },
        relationships: {
          author: {
            data: { type: "people", id: "9" }
          }
        }
      },
      included: [
        {
          type: "people",
          id: "9",
          attributes: {
            firstName: "Dan",
            lastName: "Gebhardt",
            twitter: "dgeb"
          }
        }
      ]
    };

```

Normalize JSON:API Response (NJAR) solves the problem with the JSON:API response optimization by moving every item from
"included" to the item from "data" it belongs to.

```js
    import normalize from 'normalize-json-api-response';
    console.log(normalize(data));
    
    // Normalized object
    // {
    //   "people": [
    //     {
    //       "id": "9",
    //       "attributes": {
    //         "firstName": "Dan",
    //         "lastName": "Gebhardt",
    //         "twitter": "dgeb"
    //       }
    //     }
    //   ],
    //   "articles": [
    //     {
    //       "id": "1",
    //       "attributes": {
    //         "title": "JSON:API paints my bikeshed!"
    //       },
    //       "relationships": {
    //         "people": [
    //           {
    //             "type": "people",
    //             "id": "9",
    //             "attributes": {
    //               "firstName": "Dan",
    //               "lastName": "Gebhardt",
    //               "twitter": "dgeb"
    //             }
    //           }
    //         ]
    //       }
    //     }
    //   ]
    // }

```

As you can see the "articles" property is an array of objects so that every item can be accessed easily with a simple for-loop.
The information from "included" has been moved in the "relationships" property of every item in "articles".

## Why should I use this?

There are already a number of great JSON:API normalizing packages out there (for instance, [json-api-normalizer](https://www.npmjs.com/package/json-api-normalizer) is fantastic).
However, most of those packages do not provide a simple way to access the included information from every "data" item, 
which has some severe limitations. In this case, you have to create additional functions to correct the normalized response.

# FAQ

## Dependencies

NJAR has no dependencies.

## Reporting Issues

If believe you've found an issue, please [report it](https://github.com/SinestroWhite/Normalize-JSON-API/issues) along with any relevant details to reproduce it.

## Asking for help

Please file an issue for personal support requests. Tag them with `question`.

## Contributions

Yes please! Feature requests / pull requests are welcome.

