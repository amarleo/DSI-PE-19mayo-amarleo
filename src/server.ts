import * as net from 'net';
import {spawn} from 'child_process';

net.createServer({allowHalfOpen: true}, (connection) => {
  console.log('A client has connected.');

  connection.on('close', () => {
    console.log('A client has disconnected');
  });

  connection.on('data', (data) => {
    const JSONdata = JSON.parse(data.toString());

    const clientCommand = spawn(JSONdata.command, JSONdata.args);

    if (JSONdata.args.length === 0) {
      console.log(`Command ${JSONdata.command} executed`);
    } else {
      console.log(
          `Command ${JSONdata.command}` +
          ` with arguments ${JSONdata.args} exectuted`);
    }
    let clientCommandOutput: string = '';
    clientCommand.stdout.on('data', (piece) => clientCommandOutput += piece);

    clientCommand.on('error', (err) => {
      console.error(`${err}`);
      connection.write('ERROR: wrong command');
    });

    clientCommand.on('close', () => {
      connection.write(clientCommandOutput);
      connection.end();
    });
  });
}).listen(60300, () => {
  console.log('Waiting for clients to connect');
});
