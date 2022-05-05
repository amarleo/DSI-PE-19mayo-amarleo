import * as net from 'net';
import {spawn} from 'child_process';

/**
 * server create
 * @param allowHalfOpen if set to true, socket does not auctomatically
 * end the writable side
 */
net.createServer({allowHalfOpen: true}, (connection) => {
  console.log('A client has connected.');

  /**
   * Client disconnect
   */
  connection.on('close', () => {
    console.log('A client has disconnected');
  });

  /**
   * Received data
   */
  connection.on('data', (data) => {
    const JSONdata = JSON.parse(data.toString());

    /**
     * command spawn
     */
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

    /**
     * command error
     */
    clientCommand.on('error', (err) => {
      console.error(`${err}`);
      connection.write('ERROR: wrong command');
    });

    clientCommand.stderr.on('data', (err) => {
      console.error(`${err}`);
      connection.write(`${err}`);
    });

    /**
     * commmand close
     */
    clientCommand.on('close', () => {
      connection.write(clientCommandOutput);
      connection.end();
    });
  });
}).listen(60300, () => {
  console.log('Waiting for clients to connect');
});
