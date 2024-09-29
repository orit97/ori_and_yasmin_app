// src/contexts/UserContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types/User'; // Import the User type

// Define the UserContext structure
interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (newUser: User) => {
    console.log('Setting user data:', newUser);
    setUser(newUser);
    console.log('user.data',newUser)
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
