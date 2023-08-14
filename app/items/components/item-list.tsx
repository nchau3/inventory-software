import { Item } from "../models";
import ItemListEntry from "./item-list-entry";

export default function ItemList({ items }: { items: Item[] }) {
  const itemData = items.map((item) => {
    return <ItemListEntry {...item} />;
  });

  return <ul className="min-h-0 w-3/4 border bg-slate-200">{itemData}</ul>;
}
