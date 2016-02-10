/* route: what requests; what type of requests (post or get); what to react (event handlers)
The route is the callback
*/
function route(handle, pathname, response, request) {
	console.log("About to route a request for " + pathname);
	if (typeof handle[pathname] === 'function') //if the key/val pair exits in the handle object
	{
		handle[pathname](response, request); //calls the requestHandlers.pathname with a response
	}
	else
	{
		console.log("No request handler found for " + pathname); //print the error code to the console
		response.writeHead(404, {"Content-Type": "text/plain"}); //error message head
		response.write("404 Not found"); //error message text
		response.end(); //error message ends
	}
}
exports.route = route;
