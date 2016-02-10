'use strict';

var async = require('async');
var assert = require('assert');
var request = require('request');
var Server = require('../../src/backend/server.js').Server;
var mockAbstract = require('../../db-abstract/mockAbstract');

module.exports = function () {
	
	this.Given(/^a running server$/, function (callback) {
	  callback.pending();
	});

	this.When(/^I make a post request to \/api\/keywords\/$/, function (callback) {
	  callback.pending();
	});

	this.Then(/^the server should create a new database entry$/, function (callback) {
	  callback.pending();
	});

}//module.exports = function ()