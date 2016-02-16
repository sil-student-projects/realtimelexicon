'use strict';

var child = require('child_process');

child.execFile("node_modules/.bin/cucumber-js", function (err, stdout, stderr) {
	if (err) {
		console.error(err);
	}
	if (stderr) {
		console.error(stderr);
	}
	if (stdout) {
		console.log(stdout);
	}
});