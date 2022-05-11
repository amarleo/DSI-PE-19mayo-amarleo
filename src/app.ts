import * as express from 'express';
import {join} from 'path';
import {readNote} from './notes';

const app = express();

app.use(express.static(join(__dirname, '../public')));

app.get('/notes', (req, res) => {
  if (!req.query.title) {
    res.send({
      error: 'A title has to be provided',
    });
  } else {
    readNote(req.query.title as string, (err, data) => {
      if (err) {
        res.send({
          error: err,
        });
      } else if (!data!.success) {
        res.send({
          error: `No note was found`,
        });
      } else {
        res.send({
          notes: data!.notes,
        });
      }
    });
  }
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
