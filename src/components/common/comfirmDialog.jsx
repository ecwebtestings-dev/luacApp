import Modal from './Modal'

export default function ConfirmDialog({ open, onClose, onConfirm, message, confirmLabel = 'Confirm', danger = false, loading = false }) {
  return (
    <Modal open={open} onClose={onClose} className="flex flex-col items-center justify-center text-center px-6 py-6">
      

      <p className="text-muted text-sm mb-3 max-w-xs">{message}</p>

      <div className="flex gap-2 w-full">
        <button
          onClick={onClose}
          disabled={loading}
          className="flex-1 py-2 rounded-lg text-sm font-medium text-dark hover:bg-body disabled:opacity-40 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className={`flex-1 py-2 rounded-lg text-sm font-medium text-white disabled:opacity-40 transition-colors ${
            danger ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary-light'
          }`}
        >
          {loading ? 'Please wait…' : confirmLabel}
        </button>
      </div>
    </Modal>
  )
}