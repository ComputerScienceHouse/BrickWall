import * as bodyParser from 'body-parser';

import express, { Router } from 'express';

import city from './routes/city';
import company from './routes/company';
import cors from 'cors';
import interview from './routes/interview';
import offer from './routes/offer';
import path from 'path';
import position from './routes/position';

const app = express();

const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

const api = Router();

api.use('/company', company);
api.use('/offer', offer);
api.use('/interview', interview);
api.use('/position', position);
api.use('/city', city);

app.use('/api', api);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')));
  app.use(express.static(path.join(__dirname, '..', '..', 'client', 'public')));

  app.use('*', (req, res) => {
    res.sendFile(
      path.join(__dirname, '..', '..', 'client', 'build', 'index.html')
    );
  });
}

app.listen(8080, () => {
  console.log(`🚀 Express server available at http://localhost:8080`);
});
