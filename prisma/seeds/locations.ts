import { PrismaClient } from "@prisma/client";

const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];

const data: { name: string }[] = [];

for (let i = 0; i < letters.length; i++) {
  for (let j = 0; j < 26; j++) {
    data.push({ name: `${letters[i]}-${j}` });
  }
}

export async function seedLocations(prisma: PrismaClient) {
  const createItems = await prisma.location.createMany({
    data,
  });
}
