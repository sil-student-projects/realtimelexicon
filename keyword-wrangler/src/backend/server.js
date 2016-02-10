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
		}
	});

	return server;
};

module.exports = {'Server': Server};