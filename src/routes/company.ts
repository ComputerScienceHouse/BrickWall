import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get(`/`, async (req, res) => {
  const { headquarters } = req.query;
  const result = await prisma.company.findMany({
    include: {
      headquarters: headquarters === 'true',
    },
  });
  res.json(result);
});

router.post(`/`, async (req, res) => {
  const result = await prisma.company.create({
    data: {
      ...req.body,
    },
  });
  res.json(result);
});

router.put(`/:companyId`, async (req, res) => {
  const { companyId } = req.params;
  const result = await prisma.company.update({
    where: { id: +companyId },
    data: {
      ...req.body,
    },
  });
  res.json(result);
});

export default router;
