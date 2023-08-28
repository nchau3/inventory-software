import ActiveBadge from "@/app/items/components/active-badge";

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
        if (column === "status") {
            return <td><ActiveBadge is_active={data.is_active} /></td>;
        } else if (value instanceof Date) {
            return <td>{value.toLocaleDateString()}</td>
        } else {
            // @ts-ignore
            return <td>{value}</td>;
        }
    });
    return (
        <tr className="even:bg-slate-200 odd:bg-slate-100">
            <td className="text-center">
                <input name={data.sku} type="checkbox" value="selected"></input>
            </td>
            {rowData}
        </tr>
    );
}
