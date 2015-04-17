var app = require('http').createServer(handler);
var fs = require('fs');
var io = require('socket.io')(app);

app.listen(3000, function() {
	console.log("Listening on port 3000");
});


function handler(req, res) {
	fs.readFile('./index.html', function(err, html) {
		if(err) console.log(err);
		else {
			console.log("Client connected");

			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(html);
			res.end();

			

			io.on('connection', function(socket) {
				socket.emit('hello', { msg: 'hello world!' });
			});
		}
	});
}
