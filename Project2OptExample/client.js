// npm install request, p.s. this is only for Linux os
// npm install async, use it to request async to manage status of multi callback functions (event loops)
'use strict';

var request = require('request'); //an external library
var async = require('async');

var name, status;

var getUsername = function(callback)
{
    request.get(
        'http://localhost:8080/getUserName?id=1234',
        function(err, res, body) //a get request from this url
        {
            //call the callback function with error, response, and the body
            var result = JSON.parse(body);
            name = result.value;
    });
}

var getUserStatus = function(callback)
{
    request.get(
        'http://localhost:8080/getUserStatus?id=1234',
        function(err, res, body)
        {
            var result = JSON.parse(body);
            status = result.value;
    });
};

async.parallel([getUsername, getUserStatus], function(err, results)
{
    console.log('The status of user', name, 'is', status);
});        
/* It used to be: 
start the first request, and wait it to finish then start the second one. 
Wait for the second one to finish, finally print the result to the console

Now it is two parallel requests.
*/