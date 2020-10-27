import company from './routes/company';
import offer from './routes/offer';
import interview from './routes/interview';
import city from './routes/city';
import position from './routes/position';
import createExpress from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';

const express = createExpress();

express.use(cors());
express.use(bodyParser.json());

express.use('/company', company);
express.use('/offer', offer);
express.use('/interview', interview);
express.use('/position', position);
express.use('/city', city);

express.listen(8080, () => {
  console.log(`🚀 Express server available at http://localhost:8080`);
});
