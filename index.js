const Velocity = require('./velocity/velocity');
const gpio = require('rpi-gpio').promise;

const tubeLight = 32
const bedLights = 36
const fan = 38
const socket = 40

gpio.setup(tubeLight, gpio.DIR_OUT).then(function () {
  return gpio.write(tubeLight, true);
})
gpio.setup(bedLights, gpio.DIR_OUT).then(function () {
  return gpio.write(bedLights, true);
})
gpio.setup(fan, gpio.DIR_OUT).then(function () {
  return gpio.write(fan, true);
})
gpio.setup(socket, gpio.DIR_OUT).then(function () {
  return gpio.write(socket, true);
})

let velocity = new Velocity(
  {
    devices: [{
      name: 'Tube Light',
      port: 11000,
      handler: function (action) {
        console.log('Tube Light:', action);
        relay(tubeLight, action);
      }
    },
    {
      name: 'Bed Lights',
      port: 11001,
      handler: function (action) {
        console.log('Bed Lights:', action);
        relay(bedLights, action);
      }
    },
    {
      name: 'Fan',
      port: 11002,
      handler: function (action) {
        console.log('Fan:', action);
        relay(fan, action);
      }
    },
    {
      name: 'Socket',
      port: 11003,
      handler: function (action) {
        console.log('Socket:', action);
        relay(socket, action);
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
  relay(tubeLight, 1);
  relay(bedLights, 1);
  relay(fan, 1);
  relay(socket, 1);

  velocity.stop();
}

process.on('SIGINT', function () {
  exit();
  process.exit(0);
})