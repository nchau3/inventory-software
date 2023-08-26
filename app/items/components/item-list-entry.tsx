import { itemWithTotalQuantity } from "../page";

export default function ItemListEntry(item: itemWithTotalQuantity) {
  return (
    <tr className="even:bg-slate-300 odd:bg-slate-200">
      <td className="text-center">
        <input name={item.sku} type="checkbox" value="selected"></input>
      </td>
      <td>{item.name}</td>
      <td>{item.sku}</td>
      <td>{item.totalQuantity}</td>
      <td>{item.is_active ? "ACTIVE" : "INACTIVE"}</td>
      <td>YESTERDAY</td>
    </tr>
  );
}
