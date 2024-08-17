import React, { createContext, useContext, ReactNode } from 'react';

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

const mockProducts: Product[] = [
  { id: 1, name: "Ocean", shortDesc: "water colors", longDesc: "", imag: require('../assets/Images/Ocean.jpg'), minQty: 1, currQty: 7, price: 150, discount: 15, category: "water colors" },
  { id: 2, name: "Pink storm", shortDesc: "oil colors", longDesc: "", imag: require('../assets/Images/pink.jpg'), minQty: 1, currQty: 10, price: 200,  category: "oil colors" },
  { id: 3, name: "Rainbow", shortDesc: "oil colors", longDesc: "", imag: require('../assets/Images/rainbow.jpg'), minQty: 1, currQty: 14, price: 180, discount: 10, category: "oil colors" },
  { id: 4, name: "Childhood", shortDesc: "water colors", longDesc: "", imag: require('../assets/Images/childhood.jpg'), minQty: 1, currQty: 6, price: 120, discount: 5, category: "water colors" },
  { id: 8, name: "Sad Storm", shortDesc: "oil colors", longDesc: "", imag: require('../assets/Images/obb.jpg'), minQty: 1, currQty: 4, price: 170, discount: 12, category: "abstract" },
  { id: 10, name: "Yellow Storm", shortDesc: "oil colors", longDesc: "", imag: require('../assets/Images/yellow.jpg'), minQty: 1, currQty: 3, price: 140, category: "abstract" },
  { id: 11, name: "Pain", shortDesc: "emotional art", longDesc: "", imag: require('../assets/Images/pain.jpg'), minQty: 1, currQty: 6, price: 190, discount: 18, category: "abstract" },
  { id: 12, name: "Mysterious Woman", shortDesc: "portrait", longDesc: "", imag: require('../assets/Images/women.jpg'), minQty: 1, currQty: 8, price: 210,  category: "portrait" },
  { id: 13, name: "Waves", shortDesc: "water colors", longDesc: "", imag: require('../assets/Images/waves.jpg'), minQty: 1, currQty: 5, price: 160, discount: 14, category: "water colors" },
  { id: 14, name: "Kitty Cat", shortDesc: "animal art", longDesc: "", imag: require('../assets/Images/cat.jpg'), minQty: 1, currQty: 3, price: 125, discount: 9, category: "animals" },
  { id: 15, name: "Love of Fox Mom", shortDesc: "animal art", longDesc: "", imag: require('../assets/Images/fox.jpg'), minQty: 1, currQty: 1, price: 200,  category: "animals" },
  { id: 16, name: "Blue Storm", shortDesc: "oil colors", longDesc: "", imag: require('../assets/Images/blue.jpg'), minQty: 1, currQty: 7, price: 180, discount: 15, category: "abstract" },
  { id: 17, name: "Forest", shortDesc:"oil colors", longDesc: "", imag: require('../assets/Images/trees.jpg'), minQty: 1, currQty: 4, price: 150,  category: "abstract" },
  { id: 18, name: "Lonly fish", shortDesc: "water colors", longDesc: "", imag: require('../assets/Images/fish.jpg'), minQty: 1, currQty: 14, price: 120,  category: "water colors" },
];

// Define the ProductContextProps interface for context properties
interface ProductContextProps {
  products: Product[];
}

// Create the ProductContext with initial value as undefined
const ProductContext = createContext<ProductContextProps | undefined>(undefined);

// Define the ProductProvider component
export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const products = mockProducts; // Your mockProducts or fetched products
  return (
    <ProductContext.Provider value={{ products }}>
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
