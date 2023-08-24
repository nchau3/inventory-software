import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const data = Array.from({ length: 100 }).map(() => {
  const fakeName = faker.word.noun({ length: { min: 4, max: 12 } });
  const fakeSku = `${fakeName.slice(0, 4)}-${(Math.random() * 100)
    .toString()
    .slice(-4, -1)}`;
  return { name: fakeName, sku: fakeSku };
});

export async function seedItems(prisma: PrismaClient) {
  await prisma.item.createMany({
    data,
  });

  //assign items to random locations
  for (let i = 1; i <= 75; i++) {
    const randomLocation = Math.floor(Math.random() * 100);
    const randomQuantity = Math.floor(Math.random() * 150);  

    await prisma.itemLocation.create({
      data: {
          itemId: i,
          locationId: randomLocation,
          quantity: randomQuantity
        },
    })
  }
}
