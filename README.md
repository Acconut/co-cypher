co-cypher [![Build Status](https://travis-ci.org/Acconut/co-cypher.png?branch=master)](https://travis-ci.org/Acconut/co-cypher)
-------

... is a wrapper around [node-cypher](https://npmjs.org/package/node-cypher) which provides thunks in order to use with [co](https://www.npmjs.org/package/co).

Installation
=======

Remember you need node v0.11 or newer and use the `--harmony` flag in order to get support for generators.

```
npm install co-cypher
```

Usage
=======

```javascript
var co = require("co"),
    cypher = require("../");

co(function*() {
  
  var client = yield cypher.createClient("http://localhost:7474");
  var result = yield client.query("RETURN 42 AS solution");
  console.log("The solution is %s", results.data[0][0]);
  
})();
```

`cypher.createClient` and `client.query` use the [exact same arguments as they do in node-cypher](https://github.com/objectundefined/node-cypher#createclientconnectionoptions-clientoptions-callback-).
In addition a client has `queryAsnc` which is a copy of the original `query`. Use it if you want to mix callbacks and generators (it's also used internally).

Tests
=======

You'll need a neo4j server running on localhost:7474 to pass all tests
```
npm test
# - or -
node --harmony test/test.js
```

License
=======

MIT
