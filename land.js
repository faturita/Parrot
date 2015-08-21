var arDrone = require('ar-drone');
var client = arDrone.createClient();

//client.on('navdata', console.log);

client.ftrim();

client.land();


