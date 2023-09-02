import ActiveBadge from "@/app/components/tables/active-badge";
import { format } from "date-fns";
import TableData from "./table-data";

export interface Props {
  id: number;
  name: string;
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
    if (column === "qoh") {
      return (
        <TableData key={`${data.name}-${data.id}`} value={value}></TableData>
      );
    } else if (column === "status") {
      return (
        <TableData
          key={`${data.name}-${data.id}`}
          value={<ActiveBadge is_active={data.is_active}></ActiveBadge>}
        />
      );
    } else if (column === "last_modified") {
      return (
        <TableData
          key={`${data.name}-${data.id}`}
          value={format(new Date(value), "MM-dd-yyyy")}
        ></TableData>
      );
    } else {
      return (
        <TableData key={`${data.name}-${data.id}`} value={value}></TableData>
      );
    }
  });
  return (
    <tr className="odd:bg-white even:bg-slate-100">
      <td className="p-1 text-center">
        <input name={data.sku} type="checkbox" value="selected"></input>
      </td>
      {rowData}
    </tr>
  );
}
