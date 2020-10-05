import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.company.create({
    data: {
      name: "Datadog",
      website: "https://datadoghq.com",
      City: {
        create: { city: "New York", state: "NY", country: "United States" },
      },
    },
  });

  const allCompanies = await prisma.company.findMany({
    include: {
      City: true,
    },
  });
  console.dir(allCompanies, { depth: null });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
