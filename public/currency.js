// const { server } = require('socket_api.js')

// const { Server } = require("socket.io");
// const io = new Server(server);
// const socket = io('http://3.239.208.210:3002')

let tb = document.getElementById('currency');
tb.innerHTML = 'Hi';
// console.log('hi')

let currency_prices = [];



function update() {
  let str = '<table> <tr><td>Currency Symbol Name</td><td>Currency Price</td><td>Net Change</td><td>Percentage Change % </td></tr>';
  for (var i=0; i<currency_prices.length; i++) {
    // by column
    str += '<tr><td>'
    str += currency_prices[i].s
    str += '</td>'
    str += '<td>'
    str += currency_prices[i].p
    str += '</td>'
    str += '<td>'
    str += currency_prices[i].diff.toFixed(5)
    str += '</td>'
    str += '<td>'
    str += currency_prices[i].pch.toFixed(5)
    str += '% </td></tr>'

  }
  str += '</table>';

  tb.innerHTML = str;
}

function generate() {
  fetch('/currency')
    // .then((res) => {
    //   // console.log('res', res)
    //   res.json()})
    .then((res) => res.json())
    .then((data) => {
      console.log('currency data', data)
      currency_prices = data
      update()
    })
}

generate()

// s_price('tsla', 23)

setInterval(function() {
  generate()
}, 500)


// end
