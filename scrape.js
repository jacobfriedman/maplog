var fs            = require('fs');
const WebSocket   = require('ws');
const https       = require('https')
const { exec }    = require("child_process");

// Ticker Lists

// Change Directory

var key;
fs.readFile(__dirname + "/keys", (error, data) => {
  key = data.toString()
})


pull_tiingo_tickers();

function pull_tiingo_tickers() {

  exec("./scripts/tiingo-tickers.sh", (error, stdout, stderr) => {

      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }

      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }

      console.log(`stdout: ${stdout}`);
      
  });

}

const options = {
    hostname: 'api.tiingo.com',
    port: 443,
    path: `/iex/aapl/prices?resampleFreq=1min&format=csv&startDate=2021-5-02&token=${key}`,
    //path: '/iex/?tickers=aapl,spy&format=csv&token=<key>',
    method: 'GET',
    'content-type':'application/csv'
  }

  

//https://api.tiingo.com/iex/
//function tiingo(tickers, format, method)
 /*fs.writeFile('./data/raw/', function (err) {
            if (err) return console.log(err);
            console.log('Hello World > helloworld.txt');
          });*/

// GOOD
/*
const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
  
    res.on('data', d => {
       
      process.stdout.write(d)
    })
  })
  
  req.on('error', error => {
    console.error(error)
  })
  
  req.end()

# To request top-of-book/last for all tickers, use the following REST endpoint
https://api.tiingo.com/iex

# To request top-of-book/last for specific tickers, use the following REST endpoint
https://api.tiingo.com/iex/<ticker>

# Historical Intraday Prices
https://api.tiingo.com/iex/<ticker>/prices?startDate=2019-01-02&resampleFreq=5min

  var ws = new WebSocket('wss://api.tiingo.com/test');

  var subscribe = {
          'eventName':'subscribe',
          'ticker'   
          'eventData': {
                          'authToken': '<key>'
                      }
          }
  ws.on('open', function open() {
      ws.send(JSON.stringify(subscribe));
  });
  
  ws.on('message', function(data, flags) {
      console.log(data)
  });

*/

  
    