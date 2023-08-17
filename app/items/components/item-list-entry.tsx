import { Item } from "@prisma/client";

export default function ItemListEntry(item: Item) {
  return (
    <li className="even:bg-slate-300 odd:bg-slate-200 mb-1">
      <span className="flex justify-between">
        <div>{item.name}</div>
        <div>{item.sku}</div>
        <div>{item.is_active ? "ACTIVE" : "DISABLED"}</div>
      </span>
    </li>
  );
}
