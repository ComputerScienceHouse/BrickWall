import company from './routes/company';
import offer from './routes/offer';
import interview from './routes/interview';
import city from './routes/city';
import position from './routes/position';
import express, { Router } from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

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
