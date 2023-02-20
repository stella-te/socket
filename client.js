const { io } = require("socket.io-client");

const socket = io('http://university:3000');

socket.on('disconnect', () => {
  socket.connect()
  console.log(socket.connected)
})

socket.on('connect', () => {
  console.log(socket.connected)
  // sender-client only
  socket.emit('socket-emit')
})

socket.on('io-emit', (msg) => {
  console.log(msg);
})








// end
