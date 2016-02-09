/*Client side code */ //run node index.js to start the server
var server = require("./server"); //require the module server.js
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var formidable = require("formidable");


/* the JS object, which is tha key/val pairs
the value is a command use an event handler */
var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;


/*use the function that module server.js exported;
pass on the route and the object called handle;
*/
server.start(router.route, handle);
