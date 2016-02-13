'use strict';

var MongoClient = require('mongodb').MongoClient;

var MockAbstract = function() {};
const DB_URL = 'mongodb://localhost:27017/mockAbstract';
const COLL_NAME = 'temporary';

MockAbstract.prototype.create = function (obj, callback) {
	MongoClient.connect(
		DB_URL,
		function (err, connection) {
			if (err) {
				connection.close();
				console.error(err);
			}

			var collection = connection.collection(COLL_NAME);

			collection.insert(obj, function (err, count) {
				if (err) {
					connection.close();
					console.error(err);
				} else {
					connection.close();
					callback(count);
				}
			});
		});
};

MockAbstract.prototype.update = function(filter, callback) {

};

MockAbstract.prototype.read = function (filter, callback) {
	var result = [];
	MongoClient.connect(
		DB_URL,
		function (err, connection) {
			if (err) {
				connection.close();
				console.error(err);
			}

			var collection = connection.collection(COLL_NAME);

			collection.find(filter).each(function (err, doc) {
				if (err) {
					connection.close();
					console.error(err);
				} else {
					if (doc !== null) {
						result.push(doc);
					} else {
						connection.close();
						callback(result);
					}
				}
			});
		});
};


MockAbstract.prototype.delete = function (callback) {
	MongoClient.connect(
		DB_URL,
		function (err, connection) {
			if (err) {
				connection.close();
				console.error(err);
			}

			var deleted = [];
			var collection = connection.collection(COLL_NAME);

			collection.find().each(function (err, doc) {
				if (err) {
					connection.close();
					console.error(err);
				} 
				if (doc !== null) {
					deleted.push(doc);
				} else { 
					collection.remove({}, function () {
						connection.close();
						callback(deleted);
					});
				}
			});

			
		});
};

module.exports = new MockAbstract();