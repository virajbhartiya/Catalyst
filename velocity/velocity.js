'use strict';

const SSDPService = require('./SSDPService');
const webService = require('./webService');

module.exports = function (velocity) {
	SSDPService.startSSDPServer(velocity);
	webService.startWebServer(velocity);
}