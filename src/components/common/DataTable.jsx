export default function DataTable({ columns, rows, rowKey, emptyMessage = 'No results found.' }) {
  if (rows.length === 0) {
    return <p className="text-center text-muted text-sm py-8">{emptyMessage}</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs font-semibold uppercase tracking-wide text-muted border-b border-iconBg/40">
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3">{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[rowKey]} className="border-b border-iconBg/30 last:border-0">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}