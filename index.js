const Velocity = require('./velocity/velocity');
const gpio = require('rpi-gpio').promise;

const lightOne = 37
const lightTwo = 1
gpio.setup(lightOne, gpio.DIR_OUT).then(function () {
  return gpio.write(lightOne, true);
})

let velocity = new Velocity(
  {
    devices: [{
      name: 'Light One',
      port: 11000,
      handler: function (action) {
        console.log('Light one:', action);
        relay(lightOne, action);
      }
    },
    {
      name: 'Light Two',
      port: 11001,
      handler: function (action) {
        console.log('Light Two:', action);
        relay(lightTwo, action);
      }
    }]
  });

//function to switch on and off the light
function relay(pin, action) {
  gpio.write(pin, action == 0, function () { //set pin state to 0 == on && 1 == Off
    console.log('Written pin ' + action);
  }

  );
}

function exit() {
  relay(lightOne, 1);
  relay(lightTwo, 1);

  velocity.stop();

}

process.on('SIGINT', function () {
  exit();
  process.exit(0);
})