import { PrismaClient } from "@prisma/client";
import ItemList from "./components/item-list";

const prisma = new PrismaClient();

const getItems = async () => {
  const itemsData = await prisma.item.findMany();

  return itemsData;
};

export default async function Items() {
  const items = await getItems();

  return <ItemList items={items} />;
}
