import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.item.deleteMany({});
    await prisma.location.deleteMany({});

    const banana = await prisma.item.create({
        data: {
            name: "banana"
        }
    });

    const apple = await prisma.item.create({
        data: {
            name: "apple"
        }
    });

    const aisle1 = await prisma.location.create({
        data: {
            name: "Aisle 1"
        }
    });

    const aisle2 = await prisma.location.create({
        data: {
            name: "Aisle 2"
        }
    });
}

main()
    .catch((e: Error) => {
        console.log(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect();
    })