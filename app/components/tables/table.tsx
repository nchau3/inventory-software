import TableHeader from "./table-header";
import TableRow, { Props } from "./table-row";

interface tableProps {
  body: Props[];
  columns: string[];
}

export default function Table({ data }: { data: tableProps }) {
  const formatColumnName = (colName: string) => {
    return colName.replace("_", " ").toUpperCase();
  };
  const tableColumns = data.columns.map((column, index) => {
    const name = formatColumnName(column);
    if (index === 0) {
      return (
        <>
          <TableHeader key={name + index} name="" twClasses="w-1/12" />
          <TableHeader key={name + (index + 1)} name={name} twClasses="w-1/4" />
        </>
      );
    } else {
      return <TableHeader key={name + index} name={name} />;
    }
  });

  const tableData = data
    ? data.body.map((row) => {
        const columns = data.columns;
        const rowData = {
          ...row,
          columns,
        };
        return <TableRow key={row.id} data={rowData} />;
      })
    : [];

  return (
    <table className="mt-2 min-h-0 w-full table-fixed whitespace-nowrap shadow">
      <thead className="bg-slate-600 text-white">
        <tr>{tableColumns}</tr>
      </thead>
      <tbody>{tableData}</tbody>
    </table>
  );
}
