import { PrismaClient } from "@prisma/client";
import { seedItems } from "./items";
import { seedLocations } from "./locations";

const prisma = new PrismaClient();

async function main() {
    await prisma.items.deleteMany({});
    await prisma.locations.deleteMany({});

    await seedItems(prisma);
    await seedLocations(prisma);
}

main()
    .catch((e: Error) => {
        console.log(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect();
    })