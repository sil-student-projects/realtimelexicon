/*Server side code */
var http = require("http");
var url = require("url");

function start(route, handle) { //make start a module with requiring two parameters
	function onRequest(request, response) { //createServer call this method
//		var postData = "";
		var pathname = url.parse(request.url).pathname; //get the path name
		console.log("Request for " + pathname + " received."); //printed to the server side when require the web page


		/* below is for POST request */
/*		request.setEncoding("utf8"); //type of received data
		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Received POST data chunk '" + postDataChunk + "'.");
		});

		request.addListener("end", function() {
			//make sure got all post data, and then route
			route(handle, pathname, response, postData);//after start the webpage, call function route
		});
*/
		route(handle, pathname, response, request);
		//handle is the JS obj pass through the user
		//pathname is the path user want to go
		//response is the result the server prints to the webpage
		//request is the post data
	}

	http.createServer(onRequest).listen(8888); //port number
	console.log("Server has started."); //when start the server
}
exports.start = start; //export the module's function
