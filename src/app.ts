import * as express from 'express';
import {join} from 'path';
import {cmdExecute} from './cmd';

/**
 * Express server setup
 */

const app = express();

app.use(express.static(join(__dirname, '../public')));

/**
 * Route /execmd
 */
app.get('/execmd', (req, res) => {
  if (!req.query.cmd) {
    res.send({
      error: 'A command has to be provided',
    });
  } else {
    cmdExecute(req.query.cmd as string, req.query.args as string)
        .then((result) => {
          // const jsonData: JSONdata = {
          //   cmd: req.query.cmd as string,
          //   args: req.query.args as string,
          //   output: result,
          // };
          // const obj: JSONdata = JSON.parse(jsonData.toString());
          res.send(result);
        }).catch((error) => {
          res.send(error);
        });
  }
});

/**
 * Any other route 404 code error
 */
app.get('*', (_, res) => {
  res.send('<h1>404</h1>');
});

/**
 * Port listening
 */
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
