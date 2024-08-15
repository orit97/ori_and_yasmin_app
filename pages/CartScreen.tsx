import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const CartScreen = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useFocusEffect(
    React.useCallback(() => {
      const loadCartItems = async () => {
        try {
          const storedCart = await AsyncStorage.getItem('cart');
          if (storedCart) {
            const cart = JSON.parse(storedCart);
            setCartItems(cart);

            // Calculate total price
            const total = cart.reduce((sum: number, product: Product) => {
              const price = product.discount ? product.price * (1 - product.discount / 100) : product.price;
              return sum + price * product.currQty;
            }, 0);
            setTotalPrice(total);
          }
        } catch (error) {
          console.error('Failed to load cart items from storage', error);
        }
      };

      loadCartItems();
    }, [])
  );

  const handleRemoveFromCart = async (productId: number) => {
    try {
      const newCart = cartItems.filter(item => item.id !== productId);
      await AsyncStorage.setItem('cart', JSON.stringify(newCart));
      setCartItems(newCart);
      updateTotalPrice(newCart);
    } catch (error) {
      console.error('Failed to remove item from cart', error);
    }
  };

  const handleIncreaseQty = async (productId: number) => {
    const updatedCart = cartItems.map(item =>
      item.id === productId ? { ...item, currQty: item.currQty + 1 } : item
    );
    setCartItems(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    updateTotalPrice(updatedCart);
  };

  const handleDecreaseQty = async (productId: number) => {
    const updatedCart = cartItems.map(item =>
      item.id === productId && item.currQty > 1 ? { ...item, currQty: item.currQty - 1 } : item
    );
    setCartItems(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    updateTotalPrice(updatedCart);
  };

  const updateTotalPrice = (cart: Product[]) => {
    const total = cart.reduce((sum, product) => {
      const price = product.discount ? product.price * (1 - product.discount / 100) : product.price;
      return sum + price * product.currQty;
    }, 0);
    setTotalPrice(total);
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <Image source={item.imag} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>
          {item.discount && item.price ? (
            <>
              <Text style={styles.originalPrice}>{item.price}₪</Text>
              <Text style={styles.discountedPrice}> {(item.price * (1 - item.discount / 100)).toFixed(2)}₪</Text>
            </>
          ) : (
            item.price && <Text style={styles.discountedPrice}>{item.price}₪</Text>
          )}
        </Text>
        <View style={styles.qtyContainer}>
          <TouchableOpacity onPress={() => handleDecreaseQty(item.id)} style={styles.qtyButton}>
            <Text style={styles.qtyButtonText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.currQty}</Text>
          <TouchableOpacity onPress={() => handleIncreaseQty(item.id)} style={styles.qtyButton}>
            <Text style={styles.qtyButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => handleRemoveFromCart(item.id)} style={styles.removeButton}>
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cart</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
        contentContainerStyle={styles.flatListContent}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: {totalPrice.toFixed(2)}₪</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingTop: 65,
    paddingBottom: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    alignSelf: 'center',
  },
  productCard: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    padding: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  productInfo: {
    marginLeft: 10,
    justifyContent: 'center',
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#7C8139',
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 5,
  },
  discountedPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E53935',
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  qtyButton: {
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  qtyButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  qtyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 9,
  },
  removeButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  flatListContent: {
    paddingBottom: 20,
  },
  totalContainer: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    backgroundColor: '#fff',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});

export default CartScreen;
