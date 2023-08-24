import { prisma } from '../client';
import { seedItems } from "./items";
import { seedLocations } from "./locations";

async function main() {
  await prisma.itemLocation.deleteMany({});
  await prisma.item.deleteMany({});
  await prisma.location.deleteMany({});

  await seedLocations(prisma);
  await seedItems(prisma);
}

main()
  .catch((e: Error) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
