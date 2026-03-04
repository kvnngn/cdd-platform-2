import { User } from '../types';

export const USERS: User[] = [
  {
    id: 'u1',
    name: 'Alexandre Moreau',
    initials: 'AM',
    role: 'manager',
    email: 'a.moreau@stratcap.com',
    color: '#2563eb',
  },
  {
    id: 'u2',
    name: 'Sophie Leclerc',
    initials: 'SL',
    role: 'consultant',
    email: 's.leclerc@stratcap.com',
    color: '#7c3aed',
  },
  {
    id: 'u3',
    name: 'Thomas Blanc',
    initials: 'TB',
    role: 'consultant',
    email: 't.blanc@stratcap.com',
    color: '#059669',
  },
  {
    id: 'u4',
    name: 'Camille Durand',
    initials: 'CD',
    role: 'consultant',
    email: 'c.durand@stratcap.com',
    color: '#dc2626',
  },
  {
    id: 'u5',
    name: 'Julien Petit',
    initials: 'JP',
    role: 'manager',
    email: 'j.petit@stratcap.com',
    color: '#d97706',
  },
];

export const getUserById = (id: string) => USERS.find(u => u.id === id);
