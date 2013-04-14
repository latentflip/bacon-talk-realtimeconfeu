var getCharFromEvent = function(ev) {
  return String.fromCharCode(ev.keyCode);
}

var round = function(dp, n) {
  return parseFloat(n.toFixed(dp));
}

var isANumber = function(thing) {
  return thing > 0;
}
