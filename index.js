const Velocity = require('./velocity/velocity');
const gpio = require('rpi-gpio').promise;

const lightOne = 32
const lightTwo = 36
const lightThree = 38
const lightFour = 40

gpio.setup(lightOne, gpio.DIR_OUT).then(function () {
  return gpio.write(lightOne, true);
})
gpio.setup(lightTwo, gpio.DIR_OUT).then(function () {
  return gpio.write(lightTwo, true);
})
gpio.setup(lightThree, gpio.DIR_OUT).then(function () {
  return gpio.write(lightThree, true);
})
gpio.setup(lightFour, gpio.DIR_OUT).then(function () {
  return gpio.write(lightFour, true);
})

let velocity = new Velocity(
  {
    devices: [{
      name: 'Light 1',
      port: 11000,
      handler: function (action) {
        console.log('Light one:', action);
        relay(lightOne, action);
      }
    },
    {
      name: 'Light 2',
      port: 11001,
      handler: function (action) {
        console.log('Light Two:', action);
        relay(lightTwo, action);
      }
    },
    {
      name: 'Light 3',
      port: 11002,
      handler: function (action) {
        console.log('Light Three:', action);
        relay(lightThree, action);
      }
    },
    {
      name: 'Light 4',
      port: 11003,
      handler: function (action) {
        console.log('Light Four:', action);
        relay(lightFour, action);
      }
    }
    ]
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
  relay(lightThree, 1);
  relay(lightFour, 1);

  velocity.stop();
}

process.on('SIGINT', function () {
  exit();
  process.exit(0);
})