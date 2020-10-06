import company from './routes/company';
import createExpress from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';

const express = createExpress();

express.use(cors());
express.use(bodyParser.json());

express.use('/company', company);

express.listen(4000, () => {
  console.log(`🚀 Express server available at http://localhost:4000`);
});
