const isDebug = true;

function debugPrint(msg) {
  if (isDebug) {
    console.log(msg);
  }
}

module.exports = function (msg) {
  debugPrint(msg);
}