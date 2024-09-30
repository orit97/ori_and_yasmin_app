import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useProducts } from '../contexts/ProductContext';
import LottieView from 'lottie-react-native'; // Lottie

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

const CartScreen: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false); // Success modal visibility
  const { products } = useProducts();

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
              const price = product.discount
                ? product.price * (1 - product.discount / 100)
                : product.price;
              return sum + price * product.currQty;
            }, 0);
            setTotalPrice(total);
          }
        } catch (error) {
          console.error('Failed to load cart items from storage', error);
        }
      };

      loadCartItems();
    }, [products])
  );

  const findProductById = (productId: number): Product | undefined => {
    return products.find((product) => product.id === productId);
  };

  const handleRemoveFromCart = async (productId: number) => {
    try {
      const newCart = cartItems.filter((item) => item.id !== productId);
      await AsyncStorage.setItem('cart', JSON.stringify(newCart));
      setCartItems(newCart);
      updateTotalPrice(newCart);
    } catch (error) {
      console.error('Failed to remove item from cart', error);
    }
  };

  const handleIncreaseQty = async (productId: number) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === productId) {
        const product = findProductById(productId);

        if (product && product.currQty !== undefined) {
          const availableStock = product.currQty;

          if (item.currQty < availableStock) {
            return { ...item, currQty: item.currQty + 1 };
          } else {
            Alert.alert('Stock Limit', `Only ${availableStock} items available in stock.`);
          }
        } else {
          console.error('Product not found or stock not available.');
        }
      }
      return item;
    });

    setCartItems(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    updateTotalPrice(updatedCart);
  };

  const handleDecreaseQty = async (productId: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === productId && item.currQty > 1
        ? { ...item, currQty: item.currQty - 1 }
        : item
    );
    setCartItems(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    updateTotalPrice(updatedCart);
  };

  const updateTotalPrice = (cart: Product[]) => {
    const total = cart.reduce((sum, product) => {
      const price = product.discount
        ? product.price * (1 - product.discount / 100)
        : product.price;
      return sum + price * product.currQty;
    }, 0);
    setTotalPrice(total);
  };

  const handleCheckout = () => {
    setSuccessModalVisible(true);
    setCartItems([]);
    AsyncStorage.removeItem('cart');
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
              <Text style={styles.discountedPrice}>
                {(item.price * (1 - item.discount / 100)).toFixed(2)}₪
              </Text>
            </>
          ) : (
            item.price && <Text style={styles.discountedPrice}>{item.price}₪</Text>
          )}
        </Text>
        <View style={styles.qtyContainer}>
          <TouchableOpacity
            onPress={() => handleDecreaseQty(item.id)}
            style={styles.qtyButton}
          >
            <Text style={styles.qtyButtonText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.currQty}</Text>
          <TouchableOpacity
            onPress={() => handleIncreaseQty(item.id)}
            style={styles.qtyButton}
          >
            <Text style={styles.qtyButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => handleRemoveFromCart(item.id)}
          style={styles.removeButton}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cart</Text>
      {cartItems.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>
            Your cart is empty. Add items to get started!
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
            contentContainerStyle={styles.flatListContent}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: {totalPrice.toFixed(2)}₪</Text>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Success Modal with Animation */}
      <Modal
        visible={isSuccessModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.successContainer}>
          <LottieView
            source={require('../assets/Animations/success.json')} // Correct path to the downloaded file
            autoPlay
            loop={false}
            style={styles.successAnimation}
          />
          <Text style={styles.successText}>Payment Successful! 🎉</Text>
          <TouchableOpacity
            style={styles.successButton}
            onPress={() => setSuccessModalVisible(false)}
          >
            <Text style={styles.successButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    padding: 15,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  productInfo: {
    marginLeft: 20,
    justifyContent: 'center',
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 16,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  qtyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 9,
  },
  removeButton: {
    alignSelf: 'flex-start',
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#FF6347',
  },
  removeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  flatListContent: {
    paddingBottom: 20,
  },
  totalContainer: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  checkoutButton: {
    backgroundColor: '#7C8139',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  successAnimation: {
    width: 500,
    height: 250,
  },
  successText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 5,
    marginBottom: 300,
  },
  successButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,

  },
  successButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;
