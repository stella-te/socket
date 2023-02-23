const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cors = require('cors');

app.use(cors())
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/table.html');
});

app.get('*/css/styles.css', (req, res) => {
  res.sendFile(__dirname + '/css/styles.css');
});

let str = '{"s":"TSLA:US","p":198.39,"prev":208.31,"nch":-9.920000000000016,"pch":-4.762133358936208,"dt":1677071740813,"type":"tsla:us","origin_script":"fetch.js","source":"APISTREAM"}'
let json = { a: 1, b: 2}

io.on('connection', (socket) => {
    console.log('a user connected w/ io', socket.id)
    socket.join('io-room');
    console.log('joined');

    io.to('io-room').emit('io-json-emit', json)
    console.log('io sent json ', typeof(json), json);


    io.to('io-room').emit('io-str-emit', str)
    console.log('io sent str', typeof(str), str);

    socket.on('disconnect', () => {
      console.log('a user disconnected')
    });

 });

const run = async() => {
  io.on('connection', (socket) => {

    io.to('io-room').emit('io-str-out', str)
    console.log('out io sent str', typeof(str), str);

  });
}

run().catch(console.error)


server.listen(3002, () => {
  console.log('Listening on *:3002');
});








// end
