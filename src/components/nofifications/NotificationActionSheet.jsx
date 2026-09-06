import { Fragment } from 'react';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { iconForNotification, messageOf } from '../../utils/notificationUtils';

export default function NotificationActionSheet({ notification, onClose, onDelete, isDeleting }) {
  if (!notification) return null;
  const Icon = iconForNotification(notification);

  return (
    <Fragment>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      <div className="fixed inset-x-0 bottom-0 sm:inset-0 z-50 flex items-end sm:items-center justify-center">
        <div className="bg-white w-full sm:max-w-sm rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden">
          <div className="flex justify-center pt-2 sm:hidden">
            <span className="w-9 h-1 rounded-full bg-iconBg/60" />
          </div>

          <div className="relative flex flex-col items-center text-center px-6 pt-4 pb-5 border-b border-iconBg/30">
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-2 right-2 flex items-center justify-center size-7 rounded-full text-muted hover:text-dark hover:bg-iconBg/30 transition-colors"
            >
              <XMarkIcon className="size-4" />
            </button>

            <span className="flex items-center justify-center size-12 rounded-full bg-primary/10 mb-3">
              <Icon className="size-6 text-primary" />
            </span>
            <p className="text-sm text-dark pr-4">{messageOf(notification)}</p>
          </div>

          <button
            onClick={() => onDelete(notification.id)}
            disabled={isDeleting}
            className="flex items-center gap-3 w-full px-5 py-4 text-left hover:bg-iconBg/20 disabled:opacity-50 border-b border-iconBg/30"
          >
            <XCircleIcon className="size-6 text-muted" />
            <span className="text-sm text-dark">Delete this notification</span>
          </button>

          <button
            onClick={onClose}
            className="w-full px-5 py-3.5 text-center text-sm font-medium text-muted cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </Fragment>
  );
}