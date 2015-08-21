var arDrone = require('ar-drone');
var control = arDrone.createUdpControl();
var start   = Date.now();

var ref  = {};
var pcmd = {};

console.log('Recovering from emergency mode if there was one ...');
ref.emergency = true;
setTimeout(function() {
  console.log('Takeoff ...');

  ref.emergency = false;
  ref.fly       = true;

}, 1000);

setTimeout(function() {
  console.log('Turning clockwise ...');

  pcmd.clockwise = 0.5;
}, 6000);

setTimeout(function() {
  console.log('Forward ...');

  pcmd.clockwise = 0.0;
  pcmd.front = 0.1;
}, 8000);

setTimeout(function() {
  console.log('Landing ...');

  ref.fly = false;
  pcmd = {};
}, 10000);


setInterval(function() {
  control.ref(ref);
  control.pcmd(pcmd);
  control.flush();
}, 30);
