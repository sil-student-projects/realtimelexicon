'use strict';

var async = require('async');
var assert = require('assert');
var request = require('request');
var Server = require('../../src/backend/server.js').Server;
var mockAbstract = require('../../db-abstract/mockAbstract');

module.exports = function() {

  var obj = {};
  var server;
  const PORT = 8081;
  var expected = [
      {'_id': 1, 'name': 'Dave Gillie', 'category': 'male'},
      {'_id': 2, 'name': 'Kaitlyn Gillie', 'category': 'female'}
    ];

  this.Given(/^a non-empty database$/, function (callback) {
    async.series([
        function (callback) {
          server = Server(PORT);
          server.listen(function (err) {
            if (err) {
              console.error(err);
            }
            callback();
          });
        },
        function (callback) {
          mockAbstract.delete(function (deleted) {
            callback();
          });
        },
        function (callback) {
          mockAbstract.create(expected, function (count) {
            callback();
          });
        }
      ], function (err, results) {
        callback();
      });
  });

  this.When(/^I make a get request to \/api\/keywords\/$/, function (callback) {
    request.get(
        {
          'url': 'http://localhost:'+PORT+'/api/keywords/',
          'json': true
        },
        function (err, res, body) {
          obj.res = res;
          obj.body = body;
          callback();
        });
  });

  this.Then(/^it should respond with 'expected'$/, function (callback) {
      var del;
      async.series([
        function (callback) {
          mockAbstract.delete(function (deleted) {
            del = deleted;
            callback();
          });
        },
        function (callback) {
          server.close(function() {
            callback();
          });
        }
      ], function (err, results) {
          assert.deepEqual(expected, del);
          assert.equal(obj.res.statusCode, 200);
          assert.deepEqual(obj.body._items, expected);
          callback();
      });
  });


}//module.exports = function ()