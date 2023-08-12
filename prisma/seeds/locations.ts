import { PrismaClient } from "@prisma/client";

export async function seedLocations(prisma: PrismaClient) {
    const aisle1 = await prisma.locations.create({
        data: {
            name: "Aisle 1"
        }
    });

    const aisle2 = await prisma.locations.create({
        data: {
            name: "Aisle 2"
        }
    });
}

