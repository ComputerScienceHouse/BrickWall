import { PrismaClient } from '@prisma/client';
import createExpress from 'express';
import * as bodyParser from 'body-parser';

const prisma = new PrismaClient();
const express = createExpress();

express.use(bodyParser.json());

express.post(`/company`, async (req, res) => {
  const result = await prisma.company.create({
    data: {
      ...req.body,
    },
  });
  res.json(result);
});

express.get(`/company`, async (req, res) => {
  const { city } = req.query;
  const result = await prisma.company.findMany({
    include: {
      City: city === 'true',
    },
  });
  res.json(result);
});

express.listen(4000, () => {
  console.log(`🚀 Express server available at http://localhost:4000`);
});
