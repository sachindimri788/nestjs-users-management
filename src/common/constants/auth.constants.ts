export const PREDEFINED_GROUPS: string[] = ['GROUP_1', 'GROUP_2'];
export const PREDEFINED_ROLES: string[] = ['ADMIN', 'PERSONAL', 'VIEWER'];

export const PREDEFINED_USERS = [
  {
    id: 1,
    name: 'John Doe',
    roles: ['ADMIN', 'PERSONAL'],
    groups: ['GROUP_1', 'GROUP_2'],
  },
  {
    id: 2,
    name: 'Grabriel Monroe',
    roles: ['PERSONAL'],
    groups: ['GROUP_1', 'GROUP_2'],
  },
  { id: 3, name: 'Alex Xavier', roles: ['PERSONAL'], groups: ['GROUP_2'] },
  {
    id: 4,
    name: 'Jarvis Khan',
    roles: ['ADMIN', 'PERSONAL'],
    groups: ['GROUP_2'],
  },
  {
    id: 5,
    name: 'Martines Polok',
    roles: ['ADMIN', 'PERSONAL'],
    groups: ['GROUP_1'],
  },
  {
    id: 6,
    name: 'Gabriela Wozniak',
    roles: ['VIEWER', 'PERSONAL'],
    groups: ['GROUP_1'],
  },
];

export const PERMISSIONS = ['CREATE', 'VIEW', 'EDIT', 'DELETE'] as const;

export const ROLES_WITH_PERMISSIONS = [
  {
    name: 'Admin',
    code: 'ADMIN',
    permissions: ['CREATE', 'VIEW', 'EDIT', 'DELETE'],
  },
  { name: 'Personal', code: 'PERSONAL', permissions: [] },
  { name: 'Viewer', code: 'VIEWER', permissions: ['VIEW'] },
];
