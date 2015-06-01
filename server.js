var app = require('http').createServer(handler);
var fs = require('fs');
var io = require('socket.io')(app);

app.listen(process.env.PORT || 3000, function() {
	console.log("Listening on port 3000");
});

var INTERVAL = 250;
var clients = [];

var average = function(arr) {
	var sum = 0;
	for(var i in arr) {
		sum += arr[i];
	}
	return sum / arr.length;
}

var standardDeviation = function(arr) {
	var sum = 0;
	var avg = average(arr);
	for(var i in arr) {
		var base = arr[i] - avg;
		sum += Math.pow(base, 2);
	}
	return Math.sqrt((1 / (arr.length - 1) * sum));
	//return Math.sqrt(sum/(arr.length - 1));
}

// Singleton pattern to have only one interval
var Interval = (function() {
	var interval = undefined;
	var i = 0;

	function createInstance() {
		var new_interval = setInterval(function() {
			var measurement = Math.floor(Math.random() * 100 + 1);
			var timestamp = Date.now();
			io.sockets.emit('measurement', { msg: measurement, index: i, time: timestamp });
			i++;
		}, INTERVAL);
		return new_interval;
	}

	return {
		getInstance: function() {
			console.log(interval);
			if(!interval) {
				interval = createInstance();
			}
			return interval;
		},
		removeInstance: function() {
			console.log("removing instance");
			interval = undefined;
		}
	}
})();

function handler(req, res) {
	fs.readFile('./index.html', function(err, html) {
		if(err) console.log(err);
		else {
			console.log("Client connected");

			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(html);
			res.end();

			io.on('connection', function(socket) {
				clients.push(socket);
				INTERVAL_ID = Interval.getInstance();

				if(INTERVAL_ID) {
					console.log(INTERVAL_ID === Interval.getInstance());
				}

				socket.on('writeFile', function(data) {
					console.log("data:", data);
					console.log("avg:", average(data.latencies));
					console.log("std:", standardDeviation(data.latencies));
				});

				socket.on('disconnect', function(){
					clients.pop();
					if(clients.length === 0) {
						clearInterval(INTERVAL_ID);
						Interval.removeInstance();
						console.log("Last client disconnected.");
					}
				});
			});
		}
	});
}
