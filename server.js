var app = require('http').createServer(handler);
var fs = require('fs');
var io = require('socket.io')(app);

app.listen(process.env.PORT || 3000, function() {
	console.log("Listening on port 3000");
});

var INTERVAL = 50;
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

var seed = 1;

var pseudoRandom = function(seed) {
	var x = Math.sin(seed) * 100;
	x = Math.floor(x);
	return Math.abs(x);
}


// Singleton pattern to have only one interval
var Interval = (function() {
	var interval = undefined;
	function createInstance() {
		var seed = 1;
		var new_interval = setInterval(function() {
			var measurement = pseudoRandom(seed);
			seed++;
			var timestamp = Date.now();
			io.sockets.emit('measurement', { msg: measurement, time: timestamp });
		}, INTERVAL);
		return new_interval;
	}

	return {
		getInstance: function() {
			if(!interval) {
				interval = createInstance();
			}
			return interval;
		},
		removeInstance: function() {
			console.log("removing instance");
			clearInterval(interval);
			interval = undefined;
		}
	}
})();

function handler(req, res) {
	fs.readFile('./index.html', function(err, html) {
		if(err) console.log(err);
		else {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(html);
			res.end();
		}
	});
}

io.on('connection', function(socket) {
	console.log("io on connection");
	clients.push(socket);
	Interval.getInstance();

	socket.on('writeFile', function(data) {
		data.latencies.shift();
		console.log("avg:", average(data.latencies));
		console.log("std dev:", standardDeviation(data.latencies));
		console.log("visualization avg:", average(data.visualizationTimes));
		console.log("visualization std dev:", standardDeviation(data.visualizationTimes));
		console.log("received packages / s", data.throughput / (1000 / INTERVAL));
	});

	socket.on('disconnect', function(){
		var i = clients.indexOf(socket);
  		clients.splice(i, 1);
  		if(clients.length === 0) {
  			Interval.removeInstance();
  		}
		console.log("disconnected");
	});
});
