'use strict';

var request = require('request');
var async = require('async');

var url = 'http://localhost:8080/';

async.series([

    function(callback)
    {
        request.get(url + 'getUserName?id=1234', function(err, res, body)
        {
            //console.log('Name:', JSON.parse(body).value);
            //callback(null);
            callback(null, 'Name: ' + JSON.parse(body).value);
        });
    },
    
    function(callback)
    {
        request.get(url + 'getUserStatus?id=1234', function(err, res, body)
        {
            //console.log('Status:', JSON.parse(body).value);
            //callback(null);
            callback(null, 'Status: ' + JSON.parse(body).value);
        });
    }
    // can always add more callback functions    
],
/* //print all the results of callback functions in the array
function(err, results)
{
    for (var i=0; i < results.length; i++)
    {
        console.log(results[i]);
    }
}
*/

);