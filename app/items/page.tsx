import ItemList from "./components/item-list";
import { prisma } from "../../prisma/client";
import { Item } from "@prisma/client";

export interface itemWithTotalQuantity extends Item {
  totalQuantity: number;
}

const getItems = async () => {
  const itemsData = await prisma.item.findMany({
    select: {
      id: true,
      name: true,
      sku: true,
      date_created: true,
      last_modified: true,
      is_active: true,
      locations: {
        select: {
          quantity: true
        }
      }
    }
  });

  return itemsData.map(item => {
    const totalQuantity = item.locations.reduce((prev, curr) => prev + curr.quantity, 0);
    return {
      ...item,
      totalQuantity
    }
  });
};

export default async function Items() {
  const items = await getItems();

  return <ItemList items={items} />;
}
