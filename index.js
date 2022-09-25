const FauxMo = require('node-fauxmo');
const gpio = require('rpi-gpio').promise;

const tubeLight = 32
const bedLights = 38
const fan = 36
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

let fauxmo = new FauxMo(
  {
    devices: [{
      name: 'Tube Light',
      port: 11000,
      handler: function (action) {
        relay(tubeLight, action);
      }
    },
    {
      name: 'Bed Lights',
      port: 11001,
      handler: function (action) {
        relay(bedLights, action);
      }
    },
    {
      name: 'Fan',
      port: 11002,
      handler: function (action) {
        relay(fan, action);
      }
    },
    {
      name: 'Socket',
      port: 11003,
      handler: function (action) {
        relay(socket, action);
      }
    }
    ]
  });

//function to switch on and off the light
function relay(pin, action) {
  gpio.write(pin, action == 0, function () { //set pin state to 0 == on &1 == Off
  }
  );
}

process.on('SIGINT', function () {
  process.exit(0);
})