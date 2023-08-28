import TableHeader from "./table-header";
import TableRow, { tableRowProps } from "./table-row";

interface tableProps {
    body: tableRowProps[];
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
                    <TableHeader name="" twClasses="w-1/12" />
                    <TableHeader name={name} twClasses="w-1/4" />
                </>
            )
        } else {
            return <TableHeader name={name} />
        }
    })
    
    const tableData = data.body.map(row => {
        const columns = data.columns;
        const rowData = {
            ...row,
            columns
        }
      return <TableRow key={row.id} data={rowData} />;
    });
  
    return (
      <table className="min-h-0 w-10/12 border shadow table-fixed whitespace-nowrap">
        <thead className="bg-slate-600 text-white">
          <tr>
            {tableColumns}
          </tr>
        </thead>
        <tbody>
          {tableData}
        </tbody>
      </table>
    )
  }
  