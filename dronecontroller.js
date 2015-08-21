// Open in all ports so I can receive also the signal to stop processing
var PORT=7778;
var HOST='0.0.0.0';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

var arDrone = require('ar-drone');
var control = arDrone.createUdpControl();
var start   = Date.now();

var ref  = {};
var pcmd = {};

var args = process.argv.slice(2);

// If emergency param is provided I will set the flag to clear the emergency
if (args[0]=='emergency')
{
  console.log('Recovering from emergency mode if there was one ...');
  ref.emergency = true;
}

// If takeoff param was specified, set a 10s timer to Takeoff.
if (args[0]=='takeoff')
{
  console.log('In 10 seconds, the drone will  takeoff.  BE READY!!');

  setTimeout(function() {
    console.log('Takeoff ...');

    ref.emergency = false;
    ref.fly       = true;

  }, 20000);
}

// Flat Trim.  This is always necessary with the ar-parrot
control.raw('FTRIM');


// Start the UDP server and get {state: '', speed:1.0, balance=-1.0}
server.on('listening', function () {
  var address = server.address();
  console.log('UDP Server listening on ' + address.address + ":" + address.port);

});

// For each message...
server.on('message', function (message, remote) {
  console.log(remote.address + ":" + remote.port + " - " + message);

  var state = JSON.parse( message );

  if (state.status == 'T')
  {
    console.log('Takeoff Command Received...');

    ref.emergency = false;
    ref.fly       = true;
  } else if (state.status == 'L')
  {
    console.log('Landing Command Received...');
    ref.fly = false;
    pcmd = {};

    // Shutoff the server...
    setTimeout( function() {process.exit(code=0);},3000)
  } else {

    //pcmd.clockwise = 1.1
    pcmd.left = -state.balance;
    pcmd.front =  state.speed;

  }

});


// Control LOOP
setInterval(function() {
  control.ref(ref);
  control.pcmd(pcmd);
  control.flush();
}, 30);

server.bind(PORT);
