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
	var updateBody = {
		'_id': 1,
		'name': "David Gillie",
		'category': 'male'
	};
	var lu = {
		'_id': 9000,
		'name': 'Dr. Lu',
		'category': 'male'
	};
	var preload = [
      {'_id': 1, 'name': 'Dave Gillie', 'category': 'male'},
      {'_id': 2, 'name': 'Kaitlyn Gillie', 'category': 'female'}
    ];

    //SAME GIVEN FOR MULTIPLE WHEN/THENS
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
		var expected = preload.slice();
    	expected.push(lu);

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

	this.When(/^I make a post request to \/api\/keywords\/:id\/$/, function (callback) {
  		request.post(
  			{
  				'url': URL,
  				'body': updateBody,
  				'json': true
  			},
  			function (err, res, body) {
  				if (err) throw (err);
  				assert.equal(res.statusCode, 200);
  				callback();
  			});
	});

	this.Then(/^the server should update the database entry that has a matching _id$/, function (callback) {
		var expected = preload.slice();
    	expected[0].name = "David Gillie";

		request.get(
			{
				'url': URL,
				'json': true
			},
			function (err, res, body) {
				assert.equal(res.statusCode, 200);
				assert.deepEqual(expected, body._items);
				callback();
			});
	});

}//module.exports = function ()