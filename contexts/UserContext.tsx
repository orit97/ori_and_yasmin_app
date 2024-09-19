import React, { createContext, useState, useContext, ReactNode } from 'react';

// הגדרת מבנה נתוני המשתמש
interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: Date;
  address: {
    street: string;
    city: string;
    homeNumber: number;
  };
  image?: string | null;
}

// יצירת ההקשר (Context) לשמירת פרטי המשתמש
interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// יצירת ספק (Provider) של ההקשר
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (newUser: User) => {
    setUser(newUser); // שמירת המשתמש בהקשר
  };

  const logout = () => {
    setUser(null); // יציאה מהמשתמש
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// יצירת hook לשימוש בהקשר
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
