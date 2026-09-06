import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { iconForNotification, messageOf, isUnread, timeAgo } from '../../utils/notificationUtils';

export default function NotificationRow({ notification, onOpenActions }) {
  const Icon = iconForNotification(notification);
  const unread = isUnread(notification);

  return (
    <div
      className={`flex items-center gap-3 px-3 py-2.5 border-b border-iconBg/20 last:border-b-0 ${
        unread ? 'bg-primary/[0.06]' : 'bg-white'
      }`}
    >
      <span className="flex items-center justify-center size-8 rounded-full bg-primary/10 shrink-0">
        <Icon className="size-4 text-primary" />
      </span>

      <div className="flex-1 min-w-0">
        <p className={`text-sm truncate ${unread ? 'font-medium text-dark' : 'text-dark/80'}`}>
          {messageOf(notification)}
        </p>
      </div>

      <span className="text-xs text-muted shrink-0 w-14 text-right">
        {timeAgo(notification.created_at)}
      </span>

      <button
        onClick={() => onOpenActions(notification)}
        className="text-muted hover:text-dark shrink-0 p-1 -mr-1"
      >
        <EllipsisHorizontalIcon className="size-5" />
      </button>
    </div>
  );
}