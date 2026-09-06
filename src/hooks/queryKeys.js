
export const queryKeys = {
  users: {
    all: ['users', 'all'],
    list: (page) => ['users', 'list', page],
    suspended: ['users', 'suspended'],
    detail: (id) => ['users', 'detail', id],
  },
  projects: {
  all: ['projects', 'all'],
 },
  events: {
  all: ['events', 'all'],
 },
  logs: {
    all: ['logs', 'all'],
    list: (page) => ['logs', 'list', page],
  },
  settings: {
    all: ['settings', 'all'], 
  },
  profile: {
    detail: (userId) => ['profile', 'detail', userId],
  },
  notifications: {
  all: ['notifications', 'all'],
 },
 comments: {
  byProject: (projectId) => ['comments', 'byProject', projectId],
 },
 likes: {
  count: (projectId) => ['likes', 'count', projectId],
},
};