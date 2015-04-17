var http = require('http');
var fs = require('fs');
var io = require('socket.io');



fs.readFile('./index.html', function(err, html) {
	if(err) console.log(err);
	else {
		var server = http.createServer(function(req, res) {
			console.log("Client connected");

			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(html);
			res.end();
		});

		server.listen(3000, function() {
			console.log("Listening on port 3000");
		});
	}
});




