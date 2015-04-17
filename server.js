var app = require('http').createServer(handler);
var fs = require('fs');
var io = require('socket.io')(app);

app.listen(3000, function() {
	console.log("Listening on port 3000");
});

var INTERVAL = 1000;
var INTERVAL_ID = 0;

function handler(req, res) {
	fs.readFile('./index.html', function(err, html) {
		if(err) console.log(err);
		else {
			console.log("Client connected");

			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(html);
			res.end();

			io.on('connection', function(socket) {
				var i = 0;
				INTERVAL_ID = setInterval(function() {
						var measurement = Math.floor(Math.random() * 100 + 1);
						socket.emit('measurement', { msg: measurement, time: i });
						i++;
				}, INTERVAL);
			});

			io.on('disconnect', function(socket) {
				clearInterval(INTERVAL_ID);
				console.log("Interval ID", INTERVAL_ID);
			});
		}
	});
}
