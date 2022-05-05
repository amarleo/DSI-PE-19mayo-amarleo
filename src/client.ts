import * as net from 'net';

/**
 * commandType datatype. It has two params:
 * @param command required command to execute
 * @param args opcional command arguments
 */
export type commandType = {
  command: string,
  args?: string[],
}
/**
 * command and arguments values taken from terminal
 */
const command: string = process.argv[2];
const args: string[] = process.argv.splice(3, process.argv.length);
const wholeCommand: commandType = {
  command: command,
  args: args,
};

/**
 * client net connect to port 60300
 */
export const client = net.connect({port: 60300});

client.write(JSON.stringify(wholeCommand));

/**
 * data received from server
 */
client.on('data', (dataJSON) => {
  const message = dataJSON.toString();
  console.log(message);
});
