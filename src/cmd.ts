import {spawn} from 'child_process';

export const cmdExecute = (cmd: string, args: string = '') => {
  let argsArray: string[] = args.split(' ');
  if (args === '') {
    argsArray = [];
  }
  return new Promise<string>((resolve, reject) => {
    const command = spawn(cmd, argsArray);

    let commandOutput: string = '';
    command.stdout.on('data', (piece) => commandOutput += piece);

    command.on('error', (err) => {
      reject(err);
    });

    command.stderr.on('data', (err) => {
      reject(err);
    });

    command.on('close', () => {
      resolve(commandOutput);
    });
  });
};
