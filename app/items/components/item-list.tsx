import ItemListEntry from "./item-list-entry";
import { itemWithTotalQuantity } from "../page";

export default function ItemList({ items }: { items: itemWithTotalQuantity[] }) {
  const itemData = items.map((item) => {
    return <ItemListEntry key={item.id} {...item} />;
  });

  return <ul className="min-h-0 w-10/12 border">{itemData}</ul>;
}
