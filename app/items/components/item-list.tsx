import TableHeader from "@/app/components/table-header";
import { itemWithTotalQuantity } from "../page";
import ItemListRow from "./item-list-entry";

export default function ItemList({ items }: { items: itemWithTotalQuantity[] }) {
  const itemData = items.map((item) => {
    return <ItemListRow key={item.id} {...item} />;
  });

  return (
    <table className="min-h-0 w-10/12 border shadow table-fixed whitespace-nowrap">
      <thead className="bg-slate-600 text-white">
        <tr>
          <TableHeader name="" twClasses="w-1/12" />
          <TableHeader name="Name" twClasses="w-1/4" />
          <TableHeader name="SKU" />
          <TableHeader name="QOH" />
          <TableHeader name="Status" />
          <TableHeader name="Last modified:" twClasses="md:text-sm" />
        </tr>
      </thead>
      <tbody>
        {itemData}
      </tbody>
    </table>
  )
}
