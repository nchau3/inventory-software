import { PrismaClient } from "@prisma/client";

export async function seedItems(prisma: PrismaClient) {
    const banana = await prisma.items.create({
        data: {
            name: "banana"
        }
    });

    const apple = await prisma.items.create({
        data: {
            name: "apple"
        }
    });
}