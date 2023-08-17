import { Item } from "@prisma/client";
import ItemListEntry from "./item-list-entry";

export default function ItemList({ items }: { items: Item[] }) {
  const itemData = items.map((item) => {
    return <ItemListEntry key={item.id} {...item} />;
  });

  return <ul className="min-h-0 w-3/4 border">{itemData}</ul>;
}
