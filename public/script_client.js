// const { server } = require('socket_api.js')

// const { Server } = require("socket.io");
// const io = new Server(server);
// const socket = io('http://3.239.208.210:3002')

let tb = document.getElementById('table');
tb.innerHTML = 'Hi';
// console.log('hi')

let stock_prices = [];



function update() {
  let str = '<table> <tr><td>Stock Symbol Name</td><td>Stock Price</td><td>Net Change</td><td>Percentage Change % </td></tr>';
  for (var i=0; i<stock_prices.length; i++) {
    // by column
    str += '<tr><td>'
    str += stock_prices[i].s
    str += '</td>'
    str += '<td>'
    str += stock_prices[i].p
    str += '</td>'
    str += '<td>'
    str += stock_prices[i].diff.toFixed(2)
    str += '</td>'
    str += '<td>'
    str += stock_prices[i].pch.toFixed(4)
    str += '% </td></tr>'

  }
  str += '</table>';

  tb.innerHTML = str;
}

function generate() {
  fetch('/stock')
    // .then((res) => {
    //   // console.log('res', res)
    //   res.json()})
    .then((res) => res.json())
    .then((data) => {
      console.log('stock data', data)
      stock_prices = data
      update()
    })
}

generate()

// s_price('tsla', 23)

setInterval(function() {
  generate()
}, 200)


// end
