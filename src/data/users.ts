import { User } from '@/types';

export const USERS: User[] = [
  {
    id: 'u1',
    name: 'Alex Morgan',
    initials: 'AM',
    role: 'manager',
    email: 'a.morgan@stratcap.com',
    color: '#2563eb',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 'u2',
    name: 'Sarah Clarke',
    initials: 'SC',
    role: 'consultant',
    email: 's.clarke@stratcap.com',
    color: '#7c3aed',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 'u3',
    name: 'Thomas White',
    initials: 'TW',
    role: 'consultant',
    email: 't.white@stratcap.com',
    color: '#059669',
    avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
  },
  {
    id: 'u4',
    name: 'Cameron Davis',
    initials: 'CD',
    role: 'consultant',
    email: 'c.davis@stratcap.com',
    color: '#dc2626',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
  },
  {
    id: 'u5',
    name: 'Jordan Peters',
    initials: 'JP',
    role: 'manager',
    email: 'j.peters@stratcap.com',
    color: '#d97706',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
];

export const getUserById = (id: string) => USERS.find(u => u.id === id);
