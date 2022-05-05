import * as net from 'net';

export type commandType = {
  command: string,
  args?: string[],
}

const command: string = process.argv[2];
const args: string[] = process.argv.splice(3, process.argv.length);
const wholeCommand: commandType = {
  command: command,
  args: args,
};

export const client = net.connect({port: 60300});

client.write(JSON.stringify(wholeCommand));

client.on('data', (dataJSON) => {
  const message = dataJSON.toString();
  console.log(message);
});
