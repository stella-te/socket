const express = require('express');
const app = express();
const cors = require('cors');
const { io } = require("socket.io-client");

// const socket = io('http://localhost:3002')
const socket = io('http://3.239.208.210:3002')
console.log('connected')

app.use(express.static('public'))
app.use(cors())

let o_prices = [];
let commodity_prices = [];
let stock_prices = [];
let currency_prices = [];
let did_update = false;
let idx = 0;

app.get('/commodity', (req, res) => {
  // res.sendFile(__dirname + '/table.html');

  return res.json(commodity_prices)
});

app.get('/currency', (req, res) => {
  // res.sendFile(__dirname + '/table.html');

  return res.json(currency_prices)
});

app.get('/stock', (req, res) => {
  // res.sendFile(__dirname + '/table.html');

  return res.json(stock_prices)
});


function s_price(s, p) {

  for (var i=0; i<commodity_prices.length; i++) {
    if (commodity_prices[i].s == s) {
      commodity_prices[i].diff = p - commodity_prices[i].p
      commodity_prices[i].pch = commodity_prices[i].diff * 100/commodity_prices[i].p
      commodity_prices[i].p = p;
      return
    }
  }

  for (var i=0; i<stock_prices.length; i++) {
    if (stock_prices[i].s == s) {
      stock_prices[i].diff = p - stock_prices[i].p
      stock_prices[i].pch = stock_prices[i].diff * 100/stock_prices[i].p
      stock_prices[i].p = p;
      return
    }
  }

  for (var i=0; i<currency_prices.length; i++) {
    if (currency_prices[i].s == s) {
      currency_prices[i].diff = p - currency_prices[i].p
      currency_prices[i].pch = currency_prices[i].diff * 100/currency_prices[i].p
      currency_prices[i].p = p;
      return
    }
  }

  // only run on the first time when the arr is empty
  let obj = {
    s: s,
    p: p,
    diff: 0,
    pch: 0
  }
if (s.includes(':COM')) {
  commodity_prices.push(obj)
} else if (s.includes(':CUR')) {
  currency_prices.push(obj)
} else {
  stock_prices.push(obj)
}

}

function o_price(s, p) {

  // only run on the first time when the arr is empty
  let obj = {
    s: s,
    p: p,

  }

  o_prices.push(obj)

}

function loop_data() {
  if (did_update == false && o_prices.length > 0) {
    s_price(o_prices[idx].s, o_prices[idx].p)
    idx ++;
    if (idx >= o_prices.length) {
      idx = 0;
    }
  }
  did_update = false;
}

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
    obj = JSON.parse(msg)
    s_price(obj.s, obj.p)
    o_price(obj.s, obj.p)
    did_update = true

  })

})

setInterval(function() {
  loop_data()
}, 500)

app.listen(3003, () => {
  console.log('Listening on *:3003');
});
