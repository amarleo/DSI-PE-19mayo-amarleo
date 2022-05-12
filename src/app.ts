import * as express from 'express';
import {join} from 'path';
import {cmdExecute} from './cmd';

const app = express();

app.use(express.static(join(__dirname, '../public')));

// http://localhost:3000/execmd/?cmd=ls&args[]=-a&args[]=-l

app.get('/execmd', (req, res) => {
  if (!req.query.cmd) {
    res.send({
      error: 'A command has to be provided',
    });
  } else {
    if (!req.query.args) {
      cmdExecute(req.query.cmd as string, req.query.args as string)
          .then((result) => {
            res.send(result);
          }).catch((error) => {
            res.send(error);
          });
    } else {
      cmdExecute(req.query.cmd as string, req.query.args as string)
          .then((result) => {
            res.send(result);
          }).catch((error) => {
            res.send(error);
          });
    }
  }
});

app.get('*', (_, res) => {
  res.send('<h1>404</h1>');
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
