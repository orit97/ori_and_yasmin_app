// src/contexts/LoadingContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context data
interface LoadingContextType {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

// Create the LoadingContext with a default value
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Provider component
interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Custom hook to use the LoadingContext
export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
