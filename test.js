var arDrone = require('ar-drone');
var client = arDrone.createClient();

//client.on('navdata', console.log);

client.ftrim();

client.takeoff();

setTimeout(function() {
	client.after(100,function() {
		this.clockwise(0.1);
	}).after(1000, function() {
		console.log('Stopping');
		this.stop();
	});
}, 5000);

//setInterval(1000, client.clockwise(0.1););

client.after(5000, function() {
	console.log('Landing...');
	this.stop();
	this.land();
	process.exit(code = 0);
});


