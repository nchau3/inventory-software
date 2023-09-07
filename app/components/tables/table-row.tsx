import ActiveBadge from "@/app/components/tables/active-badge";
import { format } from "date-fns";
import TableData from "./table-data";
import Link from "next/link";

export interface Props {
  id: number;
  name: string;
  path: string;
  sku?: string;
  is_active: boolean;
  qoh?: number;
  last_modified: Date;
  columns: string[];
}

export default function TableRow({ data }: { data: Props }) {
  const rowData = data.columns.map((column) => {
    // @ts-ignore
    const value = data[column];
    if (column === "name") {
      return (
        <Link href={`/${data.path}/${data.id}`} className="hover:text-slate-400 text-xl">
          <TableData key={`${data.id}-${column}`} value={value}></TableData>
        </Link>
      )
    }
    if (column === "qoh") {
      return (
        <TableData key={`${data.id}-${column}`} value={value}></TableData>
      );
    } else if (column === "status") {
      return (
        <TableData
          key={`${data.id}-${column}`}
          value={<ActiveBadge is_active={data.is_active}></ActiveBadge>}
        />
      );
    } else if (column === "last_modified") {
      return (
        <TableData
          key={`${data.id}-${column}`}
          value={format(new Date(value), "MM-dd-yyyy")}
        ></TableData>
      );
    } else {
      return (
        <TableData key={`${data.id}-${column}`} value={value}></TableData>
      );
    }
  });
  return (
    <tr className="odd:bg-white even:bg-slate-100">
      <td className="p-2 text-center">
        <input name={data.sku} type="checkbox" value="selected"></input>
      </td>
      {rowData}
    </tr>
  );
}
