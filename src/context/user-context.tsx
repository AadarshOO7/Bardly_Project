
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  name: string;
  email: string;
};

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
  logout: () => void;
  login: (email: string) => boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, _setUser] = useState<User>({ name: '', email: '' });
  const router = useRouter();

  // On initial load, try to get user from session storage
  useEffect(() => {
    const storedUser = sessionStorage.getItem('bardly-user');
    if (storedUser) {
      _setUser(JSON.parse(storedUser));
    }
  }, []);

  const setUser = (newUser: User) => {
    // This is for signing up a new user
    const users = JSON.parse(localStorage.getItem('bardly-users') || '[]');
    const userExists = users.some((u: User) => u.email.toLowerCase() === newUser.email.toLowerCase());

    if (!userExists) {
        users.push(newUser);
        localStorage.setItem('bardly-users', JSON.stringify(users));
    }

    // Set current user for the session
    sessionStorage.setItem('bardly-user', JSON.stringify(newUser));
    _setUser(newUser);
  };
  
  const login = (email: string): boolean => {
    const users = JSON.parse(localStorage.getItem('bardly-users') || '[]');
    const foundUser = users.find((u: User) => u.email.toLowerCase() === email.toLowerCase());

    if (foundUser) {
      sessionStorage.setItem('bardly-user', JSON.stringify(foundUser));
      _setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    _setUser({ name: '', email: '' });
    sessionStorage.removeItem('bardly-user');
    router.push('/login');
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, login }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
