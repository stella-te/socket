const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cors = require('cors');


const { Kafka } = require('kafkajs')

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
  console.log('connected w/ io', socket.id)
  socket.join('io-room')
  console.log('joined');

  io.to('io-room').emit('io-json-emit', json)
  console.log('io sent json ', typeof(json), json);

  io.to('io-room').emit('io-str-emit', str)
  console.log('io sent str', typeof(str), str);

  socket.on('disconnect', () => {
    console.log('a user disconnected')
  });


  });



const kafka = new Kafka({
  clientId: 'stella-socket-api',
  brokers: ['localhost:9092']
})

const consumer = kafka.consumer({groupId: 'stella-fetch-api'})

const run = async () => {
  await consumer.connect()
  console.log('connected w/ consumer')
    await consumer.subscribe({ topic: 'stella_markets', fromBeginning: true })
    console.log('subscribed')
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        str = message.value.toString()
        console.log('str to be sent to client', typeof(str), str)
        // convert the str received from the server to a js obj
        obj = await JSON.parse(str)

        io.on('connection', (socket) => {

          // io emitting to all clients, including sender
          io.to('io-room').emit('io-consumer-emit', str)
          console.log('io-emit sending consumer msg to clients @ ' + new Date().toISOString()
          + '| Message = ' + str
        )};
      }
    })
    console.log('io emitted consumer msg str', str)
  }


run().catch(console.error)

server.listen(3002, () => {
  console.log('Listening on *:3002');
});
