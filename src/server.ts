import * as net from 'net';
// import EventEmitter from 'events';

net.createServer((connection) => {
  console.log('A client has connected.');

  connection.write(`Connection established.`);

  connection.on('close', () => {
    console.log('A client has disconnected.');
  });
}).listen(60300, () => {
  console.log('Waiting for clients to connect.');
});
