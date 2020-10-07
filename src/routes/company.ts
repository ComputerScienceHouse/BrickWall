import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get(`/`, async (req, res) => {
  const { headquarters, interviews, offers, reviews } = req.query;
  const result = await prisma.company.findMany({
    include: {
      headquarters: headquarters === 'true',
      Interviews: interviews === 'true',
      Offers: offers === 'true',
      JobReviews: reviews === 'true',
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

router.get(`/:companyId`, async (req, res) => {
  const { companyId } = req.params;
  const { headquarters, interviews, offers, reviews } = req.query;
  const result = await prisma.company.findOne({
    where: { id: +companyId },
    include: {
      headquarters: headquarters === 'true',
      Interviews: interviews === 'true',
      Offers: offers === 'true',
      JobReviews: reviews === 'true',
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
