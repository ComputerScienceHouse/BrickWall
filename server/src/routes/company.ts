import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import { uploadS3 } from '../s3';

const router = Router();
const prisma = new PrismaClient();

router.get(`/`, async (req, res) => {
  const { headquarters, interviews, offers, reviews } = req.query;
  // Order by number of contributions after https://github.com/prisma/prisma-client-js/issues/249
  const result = await prisma.company.findMany({
    include: {
      headquarters: headquarters === 'true',
      Interviews: interviews === 'true',
      Offers: offers === 'true',
      JobReviews: reviews === 'true'
    }
  });
  res.json(result);
});

router.post(`/`, async (req, res) => {
  const result = await prisma.company.create({
    data: {
      ...req.body
    }
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
      Interviews:
        interviews === 'true'
          ? {
              include: {
                position: true
              }
            }
          : false,
      Offers:
        offers === 'true'
          ? {
              include: {
                position: true,
                location: true
              }
            }
          : false,
      JobReviews:
        reviews === 'true'
          ? {
              include: {
                position: true
              }
            }
          : false
    }
  });
  res.json(result);
});

router.put(`/:companyId`, async (req, res) => {
  const { companyId } = req.params;
  const result = await prisma.company.update({
    where: { id: +companyId },
    data: {
      ...req.body
    }
  });
  res.json(result);
});

router.delete(`/:companyId`, async (req, res) => {
  const { companyId } = req.params;
  const result = await prisma.company.delete({
    where: { id: +companyId }
  });
  res.json(result);
});

router.post(`/upload/:companyId`, uploadS3.single('file'), async (req, res) => {
  const { companyId } = req.params;
  await prisma.company.update({
    where: { id: +companyId },
    data: {
      logo: req.file.originalname
    }
  });
  res.json(req.file);
});

export default router;
