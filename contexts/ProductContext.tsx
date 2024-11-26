import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchData } from '../api'; // Adjust the path accordingly

// Define Product interface
interface Product {
  id: number;
  name: string;
  shortDesc: string;
  longDesc?: string;
  imag: any;
  minQty: number;
  currQty: number;
  price: number;
  discount?: number;
  category: string;
}

// Define the ProductContextProps interface for context properties
interface ProductContextProps {
  products: Product[];
  loading: boolean;
  error: string | null;
}

// Create the ProductContext with initial value as undefined
const ProductContext = createContext<ProductContextProps | undefined>(undefined);

// Define the ProductProvider component
export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiProducts = await fetchData('/products');
        setProducts(apiProducts);
      } catch (err: any) {
        console.error('Failed to fetch products:', err.message);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the product context
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
