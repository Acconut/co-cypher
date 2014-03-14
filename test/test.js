var co = require("co"),
    cypher = require("../"),
    assert = require("assert");

co(function*() {
  
  console.log("it should create a client");
  var client = yield cypher.createClient("http://localhost:7474");
  
  console.log("it should query");
  var result = yield client.query("CREATE(r) RETURN 42 AS solution");
  
  assert.deepEqual(result, {
    columns: [ "solution" ],
    data: [
      [ 42 ]
    ]
  });
  
  console.log("it should throw errors");
  var err;
  try {
    yield client.query("DOOMED");
  } catch(e) {
    err = e;
  }
  
  assert.equal(err.name, "SyntaxException");
  
  console.log("it should have an async version");
  assert.equal(typeof client.queryAsync, "function");
  
  console.log("");
  console.log("\t All tests passed!");
  console.log("");
  
})();