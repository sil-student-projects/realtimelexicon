'use strict';

var Percolator = require('percolator').Percolator;
var mockAbstract = require('../../db-abstract/mockAbstract');

var Server = function(port) {
	var server = Percolator({'port': port,
							 'autoLink': false,
							 'staticDir': __dirname + '/../frontend'});

	server.route('/api/keywords',
	{
		GET: function (req, res) {
			mockAbstract.read({}, function (result) {
				res.collection(result).send();
			});
		},

		POST: function (req, res) {
			req.onJson(function (err, body) {
				if (err) {
					console.error(err);
					res.status.internalServerError(err);
				} else {
					mockAbstract.create(body, function (count) {
						res.object({'status': 'ok', 'ids': count.insertedIds}).send();
					});
				}
			});
		}
	});

	server.route('/api/keywords/:id',
	{
		POST: function(req, res) {
			var entryId = req.uri.child();
			res.object({"README": "IMPLEMENT DATABASE WRAPPER FOR UPDATE"}).send();
		}
	});

	return server;
};

module.exports = {'Server': Server};