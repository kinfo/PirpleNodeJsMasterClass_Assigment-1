/*
*Pirple NodeJs Master Class Assignment #1
*
* Simple Hello World API
*/

var http = require('http');
var url = require('url');

var server = http.createServer((req, res) => {
	unifiedServer(req, res);
});

server.listen(3000,() => {
	console.log("The server is listening on port 3000");
});

var unifiedServer = (req, res) => {

	var parsedUrl = url.parse(req.url, true);
	var path = parsedUrl.pathname;
	var trimmedPath = path.replace(/^\/+|\/+$/g,'');
	var queryStringObject = parsedUrl.query;
	var method = req.method.toLowerCase();
	var headers = req.headers;

	var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

	chosenHandler((statusCode, payload) =>{
		statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

		payload = typeof(payload) == 'object' ? payload : {};

		var payloadString = JSON.stringify(payload);

		res.setHeader('Content-Type','application/json');
		res.writeHead(statusCode);
		res.end(payloadString);
	}); 
};

var handlers = {};

handlers.hello = (callback) => {

	let message = "Hello, this is a simple RESTful JSON API";

	callback(200, message);
};

handlers.notFound = (callback) => {
	callback(404);
};

var router = {
	'hello' : handlers.hello
};