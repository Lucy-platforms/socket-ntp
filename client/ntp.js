(function (root) {

  var ntp  = {}
    , offsets = []
    , eventEmitter
    , socket;

  ntp.init = function (sock, options) {
    options = options || {};
    
    if (options.eventEmitter) {
      eventEmitter = options.eventEmitter;
    }

    socket = sock;
    socket.on('ntp:server_sync', onSync);
    setInterval(sync, options.interval || 1000);
  };

  var onSync = function (data) {

    var diff = Date.now() - data.t1 + ((Date.now() - data.t0)/2);

    offsets.unshift(diff);

    if (offsets.length > 10)
      offsets.pop();

    if (eventEmitter) {
      eventEmitter.emit('update-offset', ntp.offset());
    }
  };


  ntp.offset = function () {
    var sum = 0;
    for (var i = 0; i < offsets.length; i++)
      sum += offsets[i];

    sum /= offsets.length;

    return sum;
  };


  var sync = function () {
    socket.emit('ntp:client_sync', { t0 : Date.now() });
  };

  // AMD/requirejs
  if (typeof define === 'function' && define.amd) {
    define('ntp', [], function () {
      return ntp;
    });
  } else {
    root.ntp = ntp;
  }

})(window);
