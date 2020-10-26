import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get(`/`, async (req, res) => {
  const {} = req.query;
  const result = await prisma.city.findMany();
  res.json(result);
});

export default router;
