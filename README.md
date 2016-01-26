##This is the RealTimeLexicon GitHub.##

The exampleServer.js file is the code that I put up for an example. It assumes that you have mongodb running on your machine.

The line:

var db = require('sharedb-mongo')('mongodb://localhost:27017/mydb');

accesses the db called 'mydb' so you have to have mongodb running and then put the name of the db you want to access on that line.
