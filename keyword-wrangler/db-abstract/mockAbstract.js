'use strict';

var MongoClient = require('mongodb').MongoClient;

var mockAbstract = {};
const dbURL = 'mongodb://localhost:27017/mockAbstract';

mockAbstract.create = function (obj, callback) {
	MongoClient.connect(
		dbURL,
		function (err, connection) {
			if (err) {
				connection.close();
				console.error(err);
			}

			var collection = connection.collection('temporary');

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
};//mockAbstract.delete


mockAbstract.read = function (filter, callback) {
	var result = [];
	MongoClient.connect(
		dbURL,
		function (err, connection) {
			if (err) {
				connection.close();
				console.error(err);
			}

			var collection = connection.collection('temporary');

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
};//mockAbstract.read


mockAbstract.delete = function (callback) {
	MongoClient.connect(
		dbURL,
		function (err, connection) {
			if (err) {
				connection.close();
				console.error(err);
			}

			var deleted = [];
			var collection = connection.collection('temporary');

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
};//mockAbstract.delete

module.exports = mockAbstract;