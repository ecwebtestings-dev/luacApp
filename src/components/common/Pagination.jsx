import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

export default function Pagination({ currentPage, lastPage, onPageChange }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-iconBg/40">
      <span className="text-xs text-muted">Page {currentPage} of {lastPage}</span>
      <div className="flex gap-2">
        <button
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex items-center justify-center size-8 rounded-lg border border-iconBg/60 text-muted disabled:opacity-30 hover:text-dark transition-colors"
        >
          <ChevronLeftIcon className="size-4" />
        </button>
        <button
          disabled={currentPage >= lastPage}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex items-center justify-center size-8 rounded-lg border border-iconBg/60 text-muted disabled:opacity-30 hover:text-dark transition-colors"
        >
          <ChevronRightIcon className="size-4" />
        </button>
      </div>
    </div>
  )
}