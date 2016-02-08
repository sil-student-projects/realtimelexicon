'use strict';

var async = require('async');
var assert = require('assert');
var request = require('request');
var mockAbstract = require('../../db-abstract/mockAbstract');

module.exports = function() {

  var obj = {};
  var expected = [
      {'_id': 1, 'name': 'Dave Gillie', 'category': 'male'},
      {'_id': 2, 'name': 'Kaitlyn Gillie', 'category': 'female'}
    ];

  this.Given(/^a non-empty database$/, function (callback) {
    async.series([
        function (callback) {
          mockAbstract.delete(function (deleted) {
            console.log("DELETED:", deleted);
            callback();
          });
        },
        function (callback) {
          mockAbstract.create(expected, function (count) {
            console.log("COUNT:", count);
            callback();
          });
        }
      ], function (err, results) {
        console.log("RESULTS:", results);
        callback();
      });
  });

  this.When(/^I make a get request to \/api\/keywords\/$/, function (callback) {
    request.get(
        {
          'url': 'http://localhost:8080/api/keywords/',
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
            console.log("DELETED:", deleted);
            del = deleted;
            callback();
          });
        }
      ], function (err, results) {
          console.log("RESULTS:", results);
          assert.deepEqual(expected, del);
          assert.equal(obj.res.statusCode, 200);
          assert.deepEqual(obj.body._items, expected);
          callback();
      });
  });


}//module.exports = function ()