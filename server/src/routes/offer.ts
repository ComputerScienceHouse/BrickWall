import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

const router = Router();
const prisma = new PrismaClient();

router.get(`/:companyId`, async (req, res) => {
  const { companyId } = req.params;
  const { location, company } = req.query;
  const result = await prisma.offer.findMany({
    where: { companyId: +companyId },
    include: {
      position: true,
      location: location === 'true',
      company: company === 'true'
    }
  });
  res.json(result);
});

router.post(`/`, async (req, res) => {
  const result = await prisma.offer.create({
    data: {
      ...req.body
    }
  });
  res.json(result);
});

router.put(`/:offerId`, async (req, res) => {
  const { offerId } = req.params;
  const result = await prisma.offer.update({
    where: { id: +offerId },
    data: {
      ...req.body
    }
  });
  res.json(result);
});

export default router;
