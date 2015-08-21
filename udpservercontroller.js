var PORT=7778;
var HOST='0.0.0.0';

//10.6.0.155

var dgram = require('dgram');
var server = dgram.createSocket('udp4');


server.on('listening', function () {
	var address = server.address();
	console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
	console.log(remote.address + ":" + remote.port + " - " + message);
	//var state = JSON.parse( message );

	//console.log( state.speed );
	//console.log( state.balance );

	//if (state.status == 'L') {
	//	console.log("Done.");
	//	process.exit(code=0);
	//}

});

server.bind(PORT);


