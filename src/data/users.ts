import { User } from '../types';

export const USERS: User[] = [
  {
    id: 'u1',
    name: 'Alex Morgan',
    initials: 'AM',
    role: 'manager',
    email: 'a.morgan@stratcap.com',
    color: '#2563eb',
  },
  {
    id: 'u2',
    name: 'Sarah Clarke',
    initials: 'SC',
    role: 'consultant',
    email: 's.clarke@stratcap.com',
    color: '#7c3aed',
  },
  {
    id: 'u3',
    name: 'Thomas White',
    initials: 'TW',
    role: 'consultant',
    email: 't.white@stratcap.com',
    color: '#059669',
  },
  {
    id: 'u4',
    name: 'Cameron Davis',
    initials: 'CD',
    role: 'consultant',
    email: 'c.davis@stratcap.com',
    color: '#dc2626',
  },
  {
    id: 'u5',
    name: 'Jordan Peters',
    initials: 'JP',
    role: 'manager',
    email: 'j.peters@stratcap.com',
    color: '#d97706',
  },
];

export const getUserById = (id: string) => USERS.find(u => u.id === id);
