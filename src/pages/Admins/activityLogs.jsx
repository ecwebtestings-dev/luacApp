import { useState } from 'react'
import { TrashIcon, ChevronLeftIcon, ChevronRightIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { useLogs, useDeleteLog } from '../../hooks/useLogs'
import { getAllLogs } from '../../Services/logService'

export default function ActivityLogs() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError, isFetching } = useLogs(page)
  const deleteLog = useDeleteLog()
  const [logToDelete, setLogToDelete] = useState(null)
  const [isExporting, setIsExporting] = useState(false)

  const logs = data?.data ?? []
  const lastPage = data?.last_page ?? 1
  const total = data?.total ?? 0

  const confirmDelete = () => {
    if (!logToDelete) return
    deleteLog.mutate(logToDelete.id, {
      onSettled: () => setLogToDelete(null),
    })
  }

  const handleExport = async () => {
    setIsExporting(true)
    try {
      const firstPage = await getAllLogs(1)
      const totalPages = firstPage.last_page ?? 1
      let allLogs = [...firstPage.data]

      for (let p = 2; p <= totalPages; p++) {
        const res = await getAllLogs(p)
        allLogs = allLogs.concat(res.data)
      }

      const doc = new jsPDF()

      doc.setFontSize(14)
      doc.text('Activity Logs', 14, 16)
      doc.setFontSize(10)
      doc.setTextColor(120)
      doc.text(`Generated ${new Date().toLocaleString()} · ${allLogs.length} events`, 14, 22)

      autoTable(doc, {
        startY: 28,
        head: [['Action', 'Details', 'Date']],
        body: allLogs.map((log) => [
          log.action,
          log.body,
          new Date(log.created_at).toLocaleString(),
        ]),
        styles: { fontSize: 9, cellPadding: 3 },
        headStyles: { fillColor: [30, 41, 28] },
        columnStyles: { 0: { cellWidth: 35 }, 2: { cellWidth: 40 } },
      })

      doc.save(`activity-logs-${new Date().toISOString().slice(0, 10)}.pdf`)
    } catch (err) {
      console.error('Failed to export logs', err)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="bg-white border rounded-2xl border-black/5 shadow-sm w-full h-full min-h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between px-6 py-5 border-b border-black/5 shrink-0">
        <div>
          <h2 className="text-lg font-bold text-dark">Activity Logs</h2>
          <p className="text-sm text-muted mt-0.5">
            {total ? `${total} recorded events` : 'System activity history'}
          </p>
        </div>

        <button
          onClick={handleExport}
          disabled={isExporting}
          className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg bg-primary/5 text-primary hover:bg-primary/10 transition-colors disabled:opacity-50 shrink-0"
        >
          <ArrowDownTrayIcon className="size-4" />
          {isExporting ? 'Exporting…' : 'Export PDF'}
        </button>
      </div>

      <div className="w-full overflow-x-auto flex-1">
        {isLoading ? (
          <div className="h-full flex items-center justify-center text-sm text-muted">
            Loading logs…
          </div>
        ) : isError ? (
          <div className="h-full flex items-center justify-center text-sm text-red-600">
            Failed to load activity logs.
          </div>
        ) : !logs.length ? (
          <div className="h-full flex items-center justify-center text-sm text-muted">
            No activity yet.
          </div>
        ) : (
          <table className="min-w-[720px] w-full text-sm">
            <thead>
              <tr className="text-left text-xs font-semibold tracking-wide text-muted uppercase border-b border-black/5">
                <th className="px-6 py-2 whitespace-nowrap">Action</th>
                <th className="px-6 py-2">Details</th>
                <th className="px-6 py-2 whitespace-nowrap">Date</th>
                <th className="px-6 py-2 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-black/[0.02]">
                  <td className="px-6 py-2 text-muted whitespace-nowrap">
                    {log.action}
                  </td>
                  <td className="px-6 py-2 text-muted whitespace-nowrap">{log.body}</td>
                  <td className="px-6 py-2 text-muted whitespace-nowrap">
                    {new Date(log.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-2 text-right whitespace-nowrap">
                    <button
                      onClick={() => setLogToDelete(log)}
                      className="text-muted hover:text-red-600 transition-colors"
                      aria-label="Delete log"
                    >
                      <TrashIcon className="size-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {lastPage > 1 && (
        <div className="flex items-center justify-between px-6 py-3 border-t border-black/5 text-sm text-muted shrink-0">
          <span>
            Page {page} of {lastPage}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || isFetching}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-black/10 hover:bg-black/5 disabled:opacity-40 transition-colors"
            >
              <ChevronLeftIcon className="size-4" /> Prev
            </button>
            <button
              onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
              disabled={page === lastPage || isFetching}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-black/10 hover:bg-black/5 disabled:opacity-40 transition-colors"
            >
              Next <ChevronRightIcon className="size-4" />
            </button>
          </div>
        </div>
      )}

      {logToDelete && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
          onClick={() => !deleteLog.isPending && setLogToDelete(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-bold text-dark mb-2">Delete this log?</h3>
            <p className="text-sm text-muted mb-6">
              "{logToDelete.body}" will be permanently removed. This can't be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setLogToDelete(null)}
                disabled={deleteLog.isPending}
                className="text-sm font-semibold px-4 py-2 rounded-lg text-dark hover:bg-black/5 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleteLog.isPending}
                className="text-sm font-semibold px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {deleteLog.isPending ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}