var arDrone = require('ar-drone');
var client = arDrone.createClient();

//client.on('navdata', console.log);

client.ftrim();

client.takeoff();


client
	.after(5000, function() {
		this.clockwise(-0.2);
		this.front(-0.1);
	})
	.after(2000, function() {
		this.stop();
		this.land();
	});


