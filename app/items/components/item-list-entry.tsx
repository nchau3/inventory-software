import { itemWithTotalQuantity } from "../page";

export default function ItemListEntry(item: itemWithTotalQuantity) {
  return (
    <li className="even:bg-slate-300 odd:bg-slate-200 mb-1 px-2">
      <span className="flex justify-between items-center">
        <input name={item.sku} type="checkbox" value="selected"></input>
        <div className="text-xl">{item.name}</div>
        <div>{item.sku}</div>
        <div>{item.totalQuantity}</div>
        <div>{item.is_active ? "ACTIVE" : "DISABLED"}</div>
      </span>
    </li>
  );
}
