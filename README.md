socket-ntp
==========

NTP Sync using Socket.io. Allows you to sync clients against a server by calculating the time offset.

## Installation

```
npm install socket-ntp
```
Requires access to [socket.io](http://socket.io/) connections on both the client and the server.

## Client usage

On the client, include:

```html
<script src="/javascripts/libs/socket.io.min.js"></script>
<script src="/client/ntp.js"></script>
```

```javascript

  var socket = io.connect();
  ntp.init(socket);  

  var offset = ntp.offset(); // time offset from the server in ms 
```

## Server usage

From anywhere that you have access to a socket.io instance.

```javascript
var ntp = require('socket-ntp');

io.sockets.on('connection', function (socket) {
  ntp.sync(socket);
});
```
