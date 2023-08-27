import { itemWithTotalQuantity } from "../page";
import ActiveBadge from "./active-badge";

export default function ItemListRow(item: itemWithTotalQuantity) {
  return (
    <tr className="even:bg-slate-200 odd:bg-slate-100">
      <td className="text-center">
        <input name={item.sku} type="checkbox" value="selected"></input>
      </td>
      <td>{item.name}</td>
      <td>{item.sku}</td>
      <td>{item.totalQuantity}</td>
      <td>
        <ActiveBadge is_active={item.is_active} />
      </td>
      <td>{item.last_modified.toLocaleDateString()}</td>
    </tr>
  );
}
