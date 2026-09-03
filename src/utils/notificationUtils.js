import {
  HeartIcon, ChatBubbleLeftIcon, CalendarDaysIcon, UserPlusIcon, BellIcon,
} from '@heroicons/react/24/outline';

const TYPE_ICON_MAP = {
  likedProject: HeartIcon,
  commentedOnProject: ChatBubbleLeftIcon,
  eventCreation: CalendarDaysIcon,
  newAccountCreation: UserPlusIcon,
  commentReply: ChatBubbleLeftIcon,
  projectCreated: BellIcon,
};

export function shortType(type) {
  if (!type) return '';
  const parts = type.split('\\');
  return parts[parts.length - 1];
}

export function iconForNotification(notification) {
  return TYPE_ICON_MAP[shortType(notification.type)] || BellIcon;
}

export function messageOf(notification) {
  return notification.data?.message || 'New notification';
}

export function isUnread(notification) {
  return !notification.read_at;
}

export function timeAgo(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  const intervals = [
    { label: 'y', secs: 31536000 },
    { label: 'mo', secs: 2592000 },
    { label: 'd', secs: 86400 },
    { label: 'h', secs: 3600 },
    { label: 'm', secs: 60 },
  ];

  for (const { label, secs } of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) return `${count}${label} ago`;
  }
  return 'just now';
}

export function extractList(notifications) {
  return Array.isArray(notifications?.notifications)
    ? notifications.notifications
    : Array.isArray(notifications?.data)
      ? notifications.data
      : Array.isArray(notifications)
        ? notifications
        : [];
}

export function extractUnreadCount(notifications) {
  if (typeof notifications?.unread_count === 'number') return notifications.unread_count;
  return extractList(notifications).filter(isUnread).length;
}