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
  res.sendFile(__dirname + '/index.html');
});

app.get('*/css/styles.css', (req, res) => {
  res.sendFile(__dirname + '/css/styles.css');
});

io.on('connection', (socket) => {
  console.log('connected')
  socket.on('socket-emit', (msg) => {
    console.log('socket-emit msg: ' + msg);

  });
});


const kafka = new Kafka({
  clientId: 'stella-socket-app',
  brokers: ['localhost:9092']
})

const consumer = kafka.consumer({groupId: 'stella-io-api'})

const run = async () => {
  await consumer.connect()
  console.log('connected')
    await consumer.subscribe({ topic: 'stella_markets', fromBeginning: false })
    console.log('subscribed')
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        str = await message.value.toString()
        // convert the str received from the server to a js obj
        obj = await JSON.parse(str)
        //
        // io.socket.emit('socket-emit', message)
        // io emitting to all clients, including sender
        io.emit('io-emit', str)
        console.log('io-emit sending msg to clients @ ' + new Date().toLocalString()
        + '| Message = ' + JSON.stringify(obj))
      }
    })
    console.log('ran consumer msg obj')
  }


run().catch(console.error)

server.listen(3002, () => {
  console.log('Listening on *:3002');
});
