import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

const router = Router();
const prisma = new PrismaClient();

router.get(`/:companyId`, async (req, res) => {
  const { companyId } = req.params;
  const { company } = req.query;
  const result = await prisma.interview.findMany({
    where: { companyId: +companyId },
    include: {
      position: true,
      company: company === 'true'
    }
  });
  res.json(result);
});

router.post(`/`, async (req, res) => {
  const result = await prisma.interview.create({
    data: {
      ...req.body
    }
  });
  res.json(result);
});

router.put(`/:offerId`, async (req, res) => {
  const { interviewId } = req.params;
  const result = await prisma.interview.update({
    where: { id: +interviewId },
    data: {
      ...req.body
    }
  });
  res.json(result);
});

export default router;
