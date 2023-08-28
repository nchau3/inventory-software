import { prisma } from "../../prisma/client";
import { Item } from "@prisma/client";
import Table from "../components/tables/table";

export interface itemWithTotalQuantity extends Item {
  qoh: number;
}

const columns = ["name", "sku", "qoh", "status", "last_modified"];

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
    const qoh = item.locations.reduce((prev, curr) => prev + curr.quantity, 0);
    return {
      ...item,
      qoh,
      columns
    }
  });
};

export default async function Items() {
  const items = await getItems();

  return <Table data={{body: items, columns: columns}} />;
}
