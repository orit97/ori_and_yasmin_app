import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

// Interface for Product data type
interface Product {
  [x: string]: any;
  id: number;
  name: string;
  shortDesc: string;
  longDesc?: string;
  imag: any; // Use 'any' to handle require
  minQty: number;
  currQty: number;
  price: number;
  discount?: number;
  category: string;
}

const mockProducts: Product[] = [
  { id: 1, name: "Ocean", shortDesc: "water colors", longDesc: "", imag: require('../assets/Images/Ocean.jpg'), minQty: 1, currQty: 1, price: 150, discount: 15, category: "water colors" },
  { id: 2, name: "Pink storm", shortDesc: "oil colors", longDesc: "", imag: require('../assets/Images/pink.jpg'), minQty: 1, currQty: 1, price: 200, category: "oil colors" },
  { id: 3, name: "Rainbow", shortDesc: "oil colors", longDesc: "", imag: require('../assets/Images/rainbow.jpg'), minQty: 1, currQty: 1, price: 180, discount: 10, category: "oil colors" },
  { id: 4, name: "Childhood", shortDesc: "water colors", longDesc: "", imag: require('../assets/Images/childhood.jpg'), minQty: 1, currQty: 1, price: 120, discount: 5, category: "water colors" },
  { id: 8, name: "Sad Storm", shortDesc: "oil colors", longDesc: "", imag: require('../assets/Images/obb.jpg'), minQty: 1, currQty: 1, price: 170, discount: 12, category: "abstract" },
  { id: 10, name: "Yellow Storm", shortDesc: "oil colors", longDesc: "", imag: require('../assets/Images/yellow.jpg'), minQty: 1, currQty: 1, price: 140, category: "abstract" },
  { id: 11, name: "Pain", shortDesc: "emotional art", longDesc: "", imag: require('../assets/Images/pain.jpg'), minQty: 1, currQty: 1, price: 190, discount: 18, category: "abstract" },
  { id: 12, name: "Mysterious Woman", shortDesc: "portrait", longDesc: "", imag: require('../assets/Images/women.jpg'), minQty: 1, currQty: 1, price: 210, category: "portrait" },
  { id: 13, name: "Waves", shortDesc: "water colors", longDesc: "", imag: require('../assets/Images/waves.jpg'), minQty: 1, currQty: 1, price: 160, discount: 14, category: "water colors" },
  { id: 14, name: "Kitty Cat", shortDesc: "animal art", longDesc: "", imag: require('../assets/Images/cat.jpg'), minQty: 1, currQty: 1, price: 125, discount: 9, category: "animals" },
  { id: 15, name: "Love of Fox Mom", shortDesc: "animal art", longDesc: "", imag: require('../assets/Images/fox.jpg'), minQty: 1, currQty: 1, price: 200, category: "animals" },
  { id: 16, name: "Blue Storm", shortDesc: "oil colors", longDesc: "", imag: require('../assets/Images/blue.jpg'), minQty: 1, currQty: 1, price: 180, discount: 15, category: "abstract" },
  { id: 17, name: "Forest", shortDesc: "oil colors", longDesc: "", imag: require('../assets/Images/trees.jpg'), minQty: 1, currQty: 1, price: 150, category: "abstract" },
  { id: 18, name: "Lonly Fish", shortDesc: "water colors", longDesc: "", imag: require('../assets/Images/fish.jpg'), minQty: 1, currQty: 1, price: 120, category: "water colors" },
];

const CartScreen = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useFocusEffect(
    React.useCallback(() => {
      const loadCartItems = async () => {
        try {
          const storedCart = await AsyncStorage.getItem('cart');
          if (storedCart) {
            const cartIds = JSON.parse(storedCart);
            const filteredProducts = mockProducts.filter(product => cartIds.includes(product.id));
            setCartItems(filteredProducts);

            // Calculate total price
            const total = filteredProducts.reduce((sum, product) => {
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
      const storedCart = await AsyncStorage.getItem('cart');
      const cart: number[] = storedCart ? JSON.parse(storedCart) : [];
      const newCart = cart.filter((id: number) => id !== productId); // Explicitly type 'id'
      await AsyncStorage.setItem('cart', JSON.stringify(newCart));
      setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
      const total = newCart.reduce((sum: number, id: number) => { // Explicitly type 'sum' and 'id'
        const product = mockProducts.find(p => p.id === id);
        if (product) {
          const price = product.discount ? product.price * (1 - product.discount / 100) : product.price;
          return sum + price * product.currQty;
        }
        return sum;
      }, 0);
      setTotalPrice(total);
    } catch (error) {
      console.error('Failed to remove item from cart', error);
    }
  };

  const handleIncreaseQty = (productId: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, currQty: item.currQty + 1 } : item
      )
    );
    updateTotalPrice();
  };

  const handleDecreaseQty = (productId: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId && item.currQty > 1
          ? { ...item, currQty: item.currQty - 1 }
          : item
      )
    );
    updateTotalPrice();
  };

  const updateTotalPrice = () => {
    const total = cartItems.reduce((sum, product) => {
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
        keyExtractor={item => item.id.toString()}
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
    letterSpacing: 1,

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
    letterSpacing: 1,
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
    marginBottom: 15,
    marginTop: 10,

  },
});

export default CartScreen;
