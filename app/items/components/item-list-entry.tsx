import { Item } from "../models";

export default function ItemListEntry(item: Item) {
  return (
    <li>
      <span className="flex justify-between">
        <div>{item.name}</div>
        <div>{item.is_active ? "ACTIVE" : "DISABLED"}</div>
        <div>{item.sku}</div>
      </span>
    </li>
  );
}
