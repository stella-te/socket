const { io } = require("socket.io-client");

// const socket = io('http://localhost:3002')
const socket = io('http://3.239.208.210:3002')


/*
let tb = document.getElementById('table');
tb.innerHTML = 'Hi';
console.log('hi')
*/

socket.on('disconnect', () => {
  socket.connect()
  console.log('try to re-connect', socket.id, socket.connected)
})

socket.on('connect', () => {
  console.log('u connected w/ ', socket.id, socket.connected);

  socket.on('io-json-emit', (msg) => {
    console.log('json data', typeof(msg), msg)
  })

  socket.on('io-str-emit', (msg) => {
    console.log('str data', typeof(msg), msg)
  })

  socket.on('io-str-out', (msg) => {
    console.log('out str data', typeof(msg), msg)
  })

  socket.on('io-consumer-emit', (msg) => {
    console.log('consumer str data', typeof(msg), msg)

    // module.exports = msg
  })

})





// end
