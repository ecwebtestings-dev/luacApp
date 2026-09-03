import { useState, useRef, useEffect } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useNotifications, useMarkNotificationsRead } from '../../hooks/useNotifications';
import {
  iconForNotification, messageOf, isUnread, timeAgo, extractList, extractUnreadCount,
} from '../../utils/notificationUtils';
import Spinner from '../common/Spinner';

export default function NotificationBell({ notificationsPath = '/dashboard/notifications' }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const { data, isLoading } = useNotifications();
  const markRead = useMarkNotificationsRead();

  const list = extractList(data).slice(0, 6);
  const unreadCount = extractUnreadCount(data);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpen = () => {
    setOpen((prev) => !prev);
    if (!open && unreadCount > 0) {
      markRead.mutate();
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={handleOpen}
        aria-label="Notifications"
        className="relative flex items-center justify-center size-9 rounded-lg hover:bg-iconBg/40 transition-colors"
      >
        <BellIcon className="size-5 text-dark" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-semibold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 max-w-[90vw] bg-white border border-iconBg/50 rounded-xl shadow-lg z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-iconBg/40">
            <h3 className="font-semibold text-dark text-sm">Notifications</h3>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {isLoading ? (
              <div className="py-6 flex justify-center"><Spinner size={18} /></div>
            ) : list.length === 0 ? (
              <p className="text-sm text-muted text-center py-6">No notifications yet.</p>
            ) : (
              list.map((n) => {
                const Icon = iconForNotification(n);
                return (
                  <div
                    key={n.id}
                    className={`flex items-start gap-2.5 px-4 py-3 border-b border-iconBg/30 last:border-b-0 ${isUnread(n) ? 'bg-primary/5' : ''}`}
                  >
                    <span className="flex items-center justify-center size-8 rounded-full bg-primary/10 shrink-0">
                      <Icon className="size-4 text-primary" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-dark break-words">{messageOf(n)}</p>
                      <p className="text-[11px] text-muted mt-0.5">{timeAgo(n.created_at)}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <button
            onClick={() => { setOpen(false); navigate(notificationsPath); }}
            className="w-full text-center text-sm text-primary font-medium py-2.5 hover:bg-iconBg/20 border-t border-iconBg/40"
          >
            View all
          </button>
        </div>
      )}
    </div>
  );
}