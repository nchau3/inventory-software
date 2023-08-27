import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { randomNumber } from "../util/random";

const data = Array.from({ length: 100 }).map(() => {
  const fakeName = faker.word.noun({ length: { min: 4, max: 12 } });
  const fakeSku = `${fakeName.slice(0, 4).toUpperCase()}-${(Math.random() * 100)
    .toString()
    .slice(-4, -1)}`;
  return { name: fakeName, sku: fakeSku };
});

export async function seedItems(prisma: PrismaClient) {
  await prisma.item.createMany({
    data,
  });

  //assign items to random locations
  for (let i = 1; i < 200; i++) {
    const randomItem = randomNumber(100);
    const randomLocation = randomNumber(150);
    const randomQuantity = randomNumber(100);

    await prisma.itemLocation.upsert({
      where: {
        itemId_locationId: {
          itemId: randomItem,
          locationId: randomLocation
        }
      },
      update: {
        quantity: {
          increment: randomQuantity
        }
      },
      create: {
          itemId: randomItem,
          locationId: randomLocation,
          quantity: randomQuantity
        },
    })
  }
}
