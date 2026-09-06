import { useState } from 'react';
import { useNotifications, useMarkNotificationsRead, useDeleteNotification } from '../../hooks/useNotifications';
import { extractList, isUnread } from '../../utils/notificationUtils';
import NotificationRow from '../../components/nofifications/notificationRow';
import NotificationActionSheet from '../../components/nofifications/NotificationActionSheet';
import Spinner from '../../components/common/Spinner';

export default function Notifications() {
  const { data, isLoading, isError } = useNotifications();
  const markRead = useMarkNotificationsRead();
  const deleteNotification = useDeleteNotification();
  const [activeNotification, setActiveNotification] = useState(null);

  const list = extractList(data);
  const hasUnread = list.some(isUnread);

  const handleDelete = (id) => {
    deleteNotification.mutate(id, {
      onSuccess: () => setActiveNotification(null),
    });
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><Spinner size={28} /></div>;
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-dashed border-iconBg/60 p-6 text-center text-muted text-sm">
        Could not load notifications.
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-dark mb-1">Notifications</h1>
          <p className="text-muted text-sm">Account creations, project activity, and events.</p>
        </div>
        {hasUnread && (
          <button
            onClick={() => markRead.mutate()}
            disabled={markRead.isPending}
            className="text-sm text-primary font-medium hover:underline disabled:opacity-50"
          >
            Mark all as read
          </button>
        )}
      </div>

      {list.length === 0 ? (
        <div className="rounded-xl border border-dashed border-iconBg/60 p-6 text-center text-muted text-sm">
          No notifications yet.
        </div>
      ) : (
        <div className="rounded-xl border border-iconBg/40 bg-white overflow-hidden">
          {list.map((n) => (
            <NotificationRow key={n.id} notification={n} onOpenActions={setActiveNotification} />
          ))}
        </div>
      )}

      <NotificationActionSheet
        notification={activeNotification}
        onClose={() => setActiveNotification(null)}
        onDelete={handleDelete}
        isDeleting={deleteNotification.isPending}
      />
    </div>
  );
}