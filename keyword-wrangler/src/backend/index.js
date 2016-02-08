'use strict';

var mockAbstract = require('../../db-abstract/mockAbstract');
var Percolator = require('percolator').Percolator;

var port = 8080;
var server = Percolator({'port': port});

server.route('/api/keywords',
	{
		GET: function (req, res) {
			mockAbstract.read({}, function (result) {
				res.collection(result).send();
			});
		}
	}
);

server.listen(function() {
	console.log('Server started and listening on port', port);
});