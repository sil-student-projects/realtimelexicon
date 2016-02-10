'use strict';

var async = require('async');
var assert = require('assert');
var request = require('request');
var Server = require('../../src/backend/server.js').Server;
var mockAbstract = require('../../db-abstract/mockAbstract');

module.exports = function () {
	
	const PORT = 8081;
	const URL = 'http://localhost:'+PORT+'/api/keywords/';
	var server;
	var lu = {
		'_id': 9000,
		'name': 'Dr. Lu',
		'category': 'male'
	};
	var preload = [
      {'_id': 1, 'name': 'Dave Gillie', 'category': 'male'},
      {'_id': 2, 'name': 'Kaitlyn Gillie', 'category': 'female'}
    ];
    var expected = preload.slice();
    expected.push(lu);

	this.Given(/^a running server with 'preload' values in database$/, function (callback) {
		server = Server(PORT);
		async.series([
			function (callback) {
				mockAbstract.delete(function (deleted) {
					callback();
				});
			},
			function (callback) {
				mockAbstract.create(preload, function (count) {
					callback();
				});
			},
			function (callback) {
				server.listen(function (err) {
					if (err) {
						console.error(err);
					}
					callback();
				});
			}
		], function (err, results) {
			callback();
		});
	});

	this.When(/^I make a post request to \/api\/keywords\/$/, function (callback) {
		 request.post(
		  	{
		  		'url': URL,
		  		'body': lu,
		  		'json': true
		  	},
		  	function (err, res, body) {
		  		assert.equal(res.statusCode, 200);
		  		callback();
		  	});
	});

	this.Then(/^the server should create a new database entry$/, function (callback) {
		var actual = {};
		async.series(
			[
				function (callback) {
					request.get(
					{
						'url': URL,
						'json': true
					},
					function (err, res, body) {
						actual.statusCode = res.statusCode;
						actual._items = body._items;
						callback();
					});
				},
				function (callback) {
					mockAbstract.delete(function (deleted) {
	  					callback();
					})
				},
				function (callback) {
					server.close(function () {
						callback();
					});
				}
			],
			function (err, results) {
				assert.equal(actual.statusCode, 200);
	  			assert.deepEqual(actual._items, expected);
	  			callback();
			}
		);
	});

}//module.exports = function ()