import ActiveBadge from "@/app/components/tables/active-badge";
import { format } from 'date-fns';
import TableData from "./table-data";

export interface tableRowProps {
    id: number,
    name: string,
    sku?: string,
    is_active: boolean,
    qoh?: number,
    last_modified: Date,
    columns: string[]
}

export default function TableRow({ data }: { data: tableRowProps }) {
    const rowData = data.columns.map(column => {
        // @ts-ignore
        const value = data[column];
        if (column === "qoh") {
            return <TableData key={`${data.name}-${data.id}`} value={value}></TableData>
        } else if (column === "status") {
            return <TableData key={`${data.name}-${data.id}`} value={<ActiveBadge is_active={data.is_active}></ActiveBadge>} />
        } else if (column === "last_modified") {
            return <TableData key={`${data.name}-${data.id}`} value={format(new Date(value), 'MM-dd-yyyy')}></TableData>
        } else {
            return <TableData key={`${data.name}-${data.id}`} value={value}></TableData>
        }
    });
    return (
        <tr className="even:bg-slate-100 odd:bg-white">
            <td className="text-center py-1">
                <input name={data.sku} type="checkbox" value="selected"></input>
            </td>
            {rowData}
        </tr>
    );
}
