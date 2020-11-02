import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

const router = Router();
const prisma = new PrismaClient();

router.get(`/:companyId`, async (req, res) => {
  const { companyId } = req.params;
  const result = await prisma.position.findMany({
    where: { companyId: +companyId }
  });
  res.json(result);
});

export default router;
