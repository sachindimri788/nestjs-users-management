// ----- Types -----

export type Group = 'GROUP_1' | 'GROUP_2';

export type Role = 'ADMIN' | 'PERSONAL' | 'VIEWER';

export type Permission = 'CREATE' | 'VIEW' | 'EDIT' | 'DELETE';

export interface User {
  id: number;
  name: string;
  roles: Role[];
  groups: Group[];
}

export interface RoleWithPermissions {
  name: string;
  code: Role;
  permissions: Permission[];
}

// ----- Constants -----

export const PREDEFINED_GROUPS: Group[] = ['GROUP_1', 'GROUP_2'];

export const PREDEFINED_ROLES: Role[] = ['ADMIN', 'PERSONAL', 'VIEWER'];

export const PREDEFINED_USERS: User[] = [
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

export const ROLES_WITH_PERMISSIONS: RoleWithPermissions[] = [
  {
    name: 'Admin',
    code: 'ADMIN',
    permissions: ['CREATE', 'VIEW', 'EDIT', 'DELETE'],
  },
  { name: 'Personal', code: 'PERSONAL', permissions: [] },
  { name: 'Viewer', code: 'VIEWER', permissions: ['VIEW'] },
];
