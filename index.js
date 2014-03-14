"use strict";

var cypher = require("node-cypher");
var exports = module.exports;

function patchClient(client) {
  client.queryAsync = client.query;
  client.query = query;
}

function query(clientQuery, params) {
  
  var this_ = this;
  return function(done) {
    this_.queryAsync(clientQuery, params, function(err, result) {
      done(err, result);
    });
  };
  
}

exports.createClient = function(host, clientOpts) {
  
  return function(done) {
    cypher.createClient(host, clientOpts, function(err, client) {
      patchClient(client);
      done(err, client);
    });
  };
  
};