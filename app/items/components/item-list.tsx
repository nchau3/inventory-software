import ItemListEntry from "./item-list-entry";
import { itemWithTotalQuantity } from "../page";

export default function ItemList({ items }: { items: itemWithTotalQuantity[] }) {
  const itemData = items.map((item) => {
    return <ItemListEntry key={item.id} {...item} />;
  });

  return (
    <table className="min-h-0 w-10/12 border table-fixed">
      <thead className="bg-slate-600 text-white">
        <tr>
          <th className="w-1/12"></th>
          <th scope="col" className="text-start w-1/4">Name</th>
          <th scope="col" className="text-start">SKU</th>
          <th scope="col" className="text-start">QOH</th>
          <th scope="col" className="text-start">Status</th>
          <th scope="col" className="text-start">Last modified:</th>
        </tr>
      </thead>
      <tbody>
        {itemData}
      </tbody>
    </table>
  )
}
