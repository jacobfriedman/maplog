const process 			= require('process')
const net           = require('net')
const WebSocket 		= require('ws')
const express       = require('express')
const cbor          = require('cbor')
const app           = express()

const wss = new WebSocket.Server({ port: 8081 });

function toBytesInt32 (num) {
  arr = new Uint8Array([
       (num & 0xff000000) >> 24,
       (num & 0x00ff0000) >> 16,
       (num & 0x0000ff00) >> 8,
       (num & 0x000000ff)
  ]);
  return arr;
}


wss.on('connection', function connection(ws) {

  // ws.binaryType = "arraybuffer" 

  ws.on('message', function incoming(message) {

    cbor.decodeFirst(message, function(error, obj) {
      // error != null if there was an error
      // obj is the unpacked object
      console.log("Object:", obj)
    });

    // This should be in a multiformat representation.
    console.log("Length:", message.length)

    var length = Buffer.alloc(4,toBytesInt32(message.length), 'binary');
    
    // CBOR Integer Indicator
    //let flag = Buffer([26], 'binary');
    client.write(length); 
    client.write(message); 
  });
});

const client = net.createConnection({ port: 10000 }, () => {
  // 'connect' listener.
  client.setEncoding('binary');
  
});

client.on('data', data => {});
client.on('end', () => {
   console.log('disconnected from server');
});




app.get('/client.js', function(req, res){
  res.sendFile('./client.js', { root: __dirname });
}); 

app.get('/', function(req, res){
  res.sendFile('./index.html', { root: __dirname });
}); 

app.listen(8080)


/*
// Create a server instance, and chain the listen function to it
net.createServer(function(socket) {
    console.log('CONNECTED: ' + socket.remoteAddress +':'+ socket.remotePort);
   


 



    // Add a 'data' event handler to this instance of socket
    socket.on('data', function(data) {
        console.log('DATA ' + socket.remoteAddress + ': ' + data);
        socket.write('This is your request: "' + data + '"');
    });
   
    // Add a 'close' event handler to this instance of socket
    socket.on('close', function(data) {
        console.log('Socket connection closed... ');
    });
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);

*/







