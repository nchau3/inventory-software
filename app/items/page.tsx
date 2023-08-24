import { Item } from "@prisma/client";
import ItemList from "./components/item-list";
import { prisma } from "../../prisma/client";

const getItems = async () => {
  const itemsData = await prisma.item.findMany();

  return itemsData;
};

export default async function Items() {
  const items = await getItems();

  return <ItemList items={items} />;
}
