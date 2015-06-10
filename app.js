var node_static = require('node-static');
var http = require('http');
const port = 8080;

var file = new node_static.Server( './public', {});

http.createServer( function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(port, function() {
  console.log("Server listening on: http://localhost:%s", port);
});
