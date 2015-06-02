var app = require('http').createServer(handler);
var fs = require('fs');
var io = require('socket.io')(app);

app.listen(process.env.PORT || 3000, function() {
	console.log("Listening on port 3000");
});

var amount_of_Clients = 3;

var sendingFrequency;
var clients = [];
var accumulatedData = [];

var throughput_500 = [];
var latency_500 = [];
var visualizationTimes_500 = [];

var throughput_250 = [];
var latency_250 = [];
var visualizationTimes_250 = [];

var throughput_125 = [];
var latency_125 = [];
var visualizationTimes_125 = [];

var throughput_50 = [];
var latency_50 = [];
var visualizationTimes_50 = [];

var throughput_10 = [];
var latency_10 = [];
var visualizationTimes_10 = [];

var throughput_5 = [];
var latency_5 = [];
var visualizationTimes_5 = [];

var count_500 = 0;
var count_250 = 0;
var count_125 = 0;
var count_50 = 0;
var count_10 = 0;
var count_5 = 0;

var output = "";
var counter = 0;

var round = function(value) {
	return Math.round(value * 1000) / 1000;
}

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
		}, sendingFrequency);
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
	
	socket.on('init', function(data) {
		clients.push(socket);
		sendingFrequency = data.frequency;
		console.log(sendingFrequency);
		Interval.getInstance();
	});

	socket.on('statistics', function(data) {
		data.latencies.shift();

		/*var statistics = {
			"sendingFrequency": sendingFrequency,
			"MeanthroughputInPercent": round(average(data.throughput)),
			"SDthroughput": round(standardDeviation(data.throughput)),
			"averageLatency": round(average(data.latencies)),
			"stdDevLatency": round(standardDeviation(data.latencies)),
			"averagevisualizationTimes": round(average(data.visualizationTimes)),
			"stdDevVisualizationTimes": round(standardDeviation(data.visualizationTimes))
		}*/

		console.log("in statistics");

		if(data.frequency == 500) {

			for(var i = 0; i < data.throughput.length; i++)
			{
				throughput_500.push(data.throughput[i]);
			}

			for(var i = 0; i < data.latencies.length; i++)
			{
				latency_500.push(data.latencies[i]);
			}

			for(var i = 0; i < data.visualizationTimes.length; i++)
			{
				visualizationTimes_500.push(data.visualizationTimes[i]);
			}

			count_500++;
		}
		

		else if(data.frequency == 250) {

			for(var i = 0; i < data.throughput.length; i++)
			{
				throughput_250.push(data.throughput[i]);
			}

			for(var i = 0; i < data.latencies.length; i++)
			{
				latency_250.push(data.latencies[i]);
			}

			for(var i = 0; i < data.visualizationTimes.length; i++)
			{
				visualizationTimes_250.push(data.visualizationTimes[i]);
			}

			count_250++;
		}

		else if(data.frequency == 125) {

			for(var i = 0; i < data.throughput.length; i++)
			{
				throughput_125.push(data.throughput[i]);
			}

			for(var i = 0; i < data.latencies.length; i++)
			{
				latency_125.push(data.latencies[i]);
			}

			for(var i = 0; i < data.visualizationTimes.length; i++)
			{
				visualizationTimes_125.push(data.visualizationTimes[i]);
			}

			count_125++;
		}

		else if(data.frequency == 50) {

			for(var i = 0; i < data.throughput.length; i++)
			{
				throughput_50.push(data.throughput[i]);
			}

			for(var i = 0; i < data.latencies.length; i++)
			{
				latency_50.push(data.latencies[i]);
			}

			for(var i = 0; i < data.visualizationTimes.length; i++)
			{
				visualizationTimes_50.push(data.visualizationTimes[i]);
			}

			count_50++;

		}

		else if(data.frequency == 10) {

			for(var i = 0; i < data.throughput.length; i++)
			{
				throughput_10.push(data.throughput[i]);
			}

			for(var i = 0; i < data.latencies.length; i++)
			{
				latency_10.push(data.latencies[i]);
			}

			for(var i = 0; i < data.visualizationTimes.length; i++)
			{
				visualizationTimes_10.push(data.visualizationTimes[i]);
			}

			count_10++;
		}

		else if(data.frequency == 5) {

			for(var i = 0; i < data.throughput.length; i++)
			{
				throughput_5.push(data.throughput[i]);
			}

			for(var i = 0; i < data.latencies.length; i++)
			{
				latency_5.push(data.latencies[i]);
			}

			for(var i = 0; i < data.visualizationTimes.length; i++)
			{
				visualizationTimes_5.push(data.visualizationTimes[i]);
			}

			count_5++;
		}

		//accumulatedData.push(statistics);

		// console.log("latency avg:", average(data.latencies));
		// console.log("latency std dev:", standardDeviation(data.latencies));
		// console.log("visualization avg:", average(data.visualizationTimes));
		// console.log("visualization std dev:", standardDeviation(data.visualizationTimes));
		// console.log("received packages % s", data.throughput / (1000 / sendingFrequency));
	});

	socket.on('writeFile', function() {

		counter++;
		console.log("in writeFile");


		if(counter == amount_of_Clients) 
		{

			var allData500 = {
				"sendingFrequency": 500,
				"MeanthroughputInPercent": round(average(throughput_500)),
				"SDthroughput": round(standardDeviation(throughput_500)),
				"averageLatency": round(average(latency_500)),
				"stdDevLatency": round(standardDeviation(latency_500)),
				"averagevisualizationTimes": round(average(visualizationTimes_500)),
				"stdDevVisualizationTimes": round(standardDeviation(visualizationTimes_500)),
				"count": round(count_500/amount_of_Clients)
			}

			accumulatedData.push(allData500);

			var allData250 = {
				"sendingFrequency": 250,
				"MeanthroughputInPercent": round(average(throughput_250)),
				"SDthroughput": round(standardDeviation(throughput_250)),
				"averageLatency": round(average(latency_250)),
				"stdDevLatency": round(standardDeviation(latency_250)),
				"averagevisualizationTimes": round(average(visualizationTimes_250)),
				"stdDevVisualizationTimes": round(standardDeviation(visualizationTimes_250)),
				"count": round(count_250/amount_of_Clients)
			}

			accumulatedData.push(allData250);

			var allData125 = {
				"sendingFrequency": 125,
				"MeanthroughputInPercent": round(average(throughput_125)),
				"SDthroughput": round(standardDeviation(throughput_125)),
				"averageLatency": round(average(latency_125)),
				"stdDevLatency": round(standardDeviation(latency_125)),
				"averagevisualizationTimes": round(average(visualizationTimes_125)),
				"stdDevVisualizationTimes": round(standardDeviation(visualizationTimes_125)),
				"count": round(count_125/amount_of_Clients)
			}

			accumulatedData.push(allData125);

			var allData50 = {
				"sendingFrequency": 50,
				"MeanthroughputInPercent": round(average(throughput_50)),
				"SDthroughput": round(standardDeviation(throughput_50)),
				"averageLatency": round(average(latency_50)),
				"stdDevLatency": round(standardDeviation(latency_50)),
				"averagevisualizationTimes": round(average(visualizationTimes_50)),
				"stdDevVisualizationTimes": round(standardDeviation(visualizationTimes_50)),
				"count": round(count_50/amount_of_Clients)
			}

			accumulatedData.push(allData50);

			var allData10 = {
				"sendingFrequency": 10,
				"MeanthroughputInPercent": round(average(throughput_10)),
				"SDthroughput": round(standardDeviation(throughput_10)),
				"averageLatency": round(average(latency_10)),
				"stdDevLatency": round(standardDeviation(latency_10)),
				"averagevisualizationTimes": round(average(visualizationTimes_10)),
				"stdDevVisualizationTimes": round(standardDeviation(visualizationTimes_10)),
				"count": round(count_10/amount_of_Clients)
			}

			accumulatedData.push(allData10);

			var allData5 = {
				"sendingFrequency": 5,
				"MeanthroughputInPercent": round(average(throughput_5)),
				"SDthroughput": round(standardDeviation(throughput_5)),
				"averageLatency": round(average(latency_5)),
				"stdDevLatency": round(standardDeviation(latency_5)),
				"averagevisualizationTimes": round(average(visualizationTimes_5)),
				"stdDevVisualizationTimes": round(standardDeviation(visualizationTimes_5)),
				"count": round(count_5/amount_of_Clients)
			}

			accumulatedData.push(allData5);


		for(var i = 0; i < accumulatedData.length; i++) {
			output += accumulatedData[i].sendingFrequency + "\t" 
				+ accumulatedData[i].MeanthroughputInPercent + "\t" 
				+ accumulatedData[i].SDthroughput + "\t" 
				+ accumulatedData[i].averageLatency + "\t"
				+ accumulatedData[i].stdDevLatency + "\t"
				+ accumulatedData[i].averagevisualizationTimes + "\t"
				+ accumulatedData[i].stdDevVisualizationTimes + "\t"
				+ accumulatedData[i].count + "\n"
		}

			fs.writeFile('data_test_clients.dat', output, function(err) {
  				if(err) throw err;
  				console.log("FIN");
  			});	
		}

		
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