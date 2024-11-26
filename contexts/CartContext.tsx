import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CartItem {
  productId: number;
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  cartCount: number;
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cart');
        if (storedCart) {
          const parsedCart: CartItem[] = JSON.parse(storedCart);
          setCart(parsedCart);
          updateCartCount(parsedCart);
        }
      } catch (error) {
        console.error('Failed to load cart from storage:', error);
      }
    };

    loadCart();
  }, []);

  const updateCartCount = (cartItems: CartItem[]) => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  };

  const addToCart = async (productId: number) => {
    const existingItemIndex = cart.findIndex(item => item.productId === productId);
    let updatedCart;

    if (existingItemIndex >= 0) {
      updatedCart = cart.map(item =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { productId, quantity: 1 }];
    }

    setCart(updatedCart);
    updateCartCount(updatedCart);

    try {
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      console.log('Item added to cart:', updatedCart);
    } catch (error) {
      console.error('Failed to save cart to storage:', error);
    }
  };

  const removeFromCart = async (productId: number) => {
    const updatedCart = cart.filter(item => item.productId !== productId);
    setCart(updatedCart);
    updateCartCount(updatedCart);

    try {
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

  const clearCart = async () => {
    setCart([]);
    setCartCount(0);

    try {
      await AsyncStorage.removeItem('cart');
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartProvider;
