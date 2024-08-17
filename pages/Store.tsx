import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../components/NavBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageSourcePropType } from 'react-native';

// Interface for Product data type
interface Product {
  id: number;
  name: string;
  shortDesc: string;
  longDesc?: string;
  imag: ImageSourcePropType;
  minQty: number;
  currQty: number;  // מייצג את הכמות המקסימלית במלאי
  price: number;
  discount?: number;
  category: string;
  isLiked?: boolean;
  isAddedToCart?: boolean;
  isCartButtonGreen?: boolean;
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
  { id: 18, name: "Lonly fish", shortDesc: "water colors", longDesc: "", imag: require('../assets/Images/fish.jpg'), minQty: 1, currQty: 8, price: 120,  category: "water colors" },
];

import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Store: undefined;
  Product: { item: Product };
};

type StoreScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Store'>;

export default function Store() {
  const navigation = useNavigation<StoreScreenNavigationProp>();

  const [wishlist, setWishlist] = useState<number[]>([]);
  const [products, setProducts] = useState<Product[]>(mockProducts.map(product => ({ ...product, isLiked: false, isAddedToCart: false, isCartButtonGreen: false })));
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOption, setSortOption] = useState<string>('None');
  const [categoryModalVisible, setCategoryModalVisible] = useState<boolean>(false);
  const [sortModalVisible, setSortModalVisible] = useState<boolean>(false);

  // Dynamically generate unique categories from the products
  const categories = ['All', ...Array.from(new Set(products.map(product => product.category)))];

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const storedWishlist = await AsyncStorage.getItem('wishlist');
        if (storedWishlist) {
          setWishlist(JSON.parse(storedWishlist));
        }
      } catch (error) {
        console.error('Failed to load wishlist from storage', error);
      }
    };

    loadWishlist();
  }, []);

  const handleLikePress = async (productId: number) => {
    const newWishlist = wishlist.includes(productId)
      ? wishlist.filter(id => id !== productId)
      : [...wishlist, productId];

    setWishlist(newWishlist);

    try {
      await AsyncStorage.setItem('wishlist', JSON.stringify(newWishlist));
    } catch (error) {
      console.error('Failed to save wishlist to storage', error);
    }

    setProducts(prevProducts =>
      prevProducts.map(product => (product.id === productId ? { ...product, isLiked: !product.isLiked } : product))
    );
  };

  const handleAddToCart = async (product: Product) => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      const cart = storedCart ? JSON.parse(storedCart) : [];
  
      const existingProductIndex = cart.findIndex((item: Product) => item.id === product.id);
  
      if (existingProductIndex !== -1) {
        // אם המוצר כבר בעגלה, נוודא שלא נחרוג מהמלאי המקסימלי
        if (cart[existingProductIndex].currQty < product.currQty) {
          cart[existingProductIndex].currQty += 1;
        } else {
          alert('Cannot add more items than available in stock.');
          return;
        }
      } else {
        // אם המוצר לא בעגלה, נוסיף אותו עם כמות התחלתית של 1
        if (product.currQty > 0) {
          cart.push({ ...product, currQty: 1 });
        } else {
          alert('המוצר אינו זמין במלאי.');
          return;
        }
      }
  
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      console.log('Product added to cart:', cart);
  
      // Update the state to show "Added to Cart", change button color to green, and revert after 0.5 seconds
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.id === product.id ? { ...p, isAddedToCart: true, isCartButtonGreen: true } : p
        )
      );
  
      setTimeout(() => {
        setProducts(prevProducts =>
          prevProducts.map(p =>
            p.id === product.id ? { ...p, isCartButtonGreen: false, isAddedToCart: false } : p
          )
        );
      }, 500); // Change the background back after 0.5 seconds
  
    } catch (error) {
      console.error('Failed to add item to cart', error);
    }
  };
  

  const getDiscountedPrice = (product: Product) => {
    const price = typeof product.price === 'number' ? product.price : 0;
    const discount = typeof product.discount === 'number' ? product.discount : 0;
    const discountedPrice = price * (1 - discount / 100);
    return parseFloat(discountedPrice.toFixed(2)); // Return as a number
  };
  
  const filteredProducts = products.filter(product => selectedCategory === 'All' || product.category === selectedCategory);
  const sortedProducts = filteredProducts.sort((a, b) => {
    const priceA = getDiscountedPrice(a);
    const priceB = getDiscountedPrice(b);
    if (sortOption === 'Price: Low to High') {
      return priceA - priceB;
    } else if (sortOption === 'Price: High to Low') {
      return priceB - priceA;
    }
    return 0;
  });

  const renderItem = ({ item }: { item: Product }) => {
    return (
      <View style={styles.productCard}>
        <TouchableOpacity onPress={() => navigation.navigate('Product', { item })}>
          <View style={styles.imageContainer}>
            <Image source={item.imag} style={styles.productImage} />
            {item.discount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{item.discount}% OFF</Text>
              </View>
            )}
          </View>
          <View style={styles.productInfo}>
            <View style={styles.productInfoHeader}>
              <Text style={styles.productName}>{item.name}</Text>
              <TouchableOpacity onPress={() => handleLikePress(item.id)} style={styles.heartIcon}>
                <Icon
                  name="heart"
                  size={24}
                  style={[styles.icon, wishlist.includes(item.id) ? { color: 'red' } : { color: 'grey' }]}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.productPrice}>{getDiscountedPrice(item)}₪</Text>
            <TouchableOpacity 
              onPress={() => handleAddToCart(item)} 
              style={[
                styles.addToCartButton, 
                item.isCartButtonGreen ? { backgroundColor: 'green' } : {}
              ]}
              disabled={item.isAddedToCart}
            >
              <Text style={styles.addToCartText}>
                {item.isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
              </Text>
              <Icon name="shopping-cart" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderModal = (visible: boolean, setVisible: (visible: boolean) => void, options: string[], onSelect: (option: string) => void) => (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalItem}
                onPress={() => {
                  onSelect(option);
                  setVisible(false);
                }}
              >
                <Text style={styles.modalItemText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  return (
    <>
      <Navbar />
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={() => setCategoryModalVisible(true)}>
          <Text style={styles.filterButtonText}>{selectedCategory}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => setSortModalVisible(true)}>
          <Text style={styles.filterButtonText}>{sortOption}</Text>
        </TouchableOpacity>
      </View>
      {renderModal(categoryModalVisible, setCategoryModalVisible, categories, setSelectedCategory)}
      {renderModal(sortModalVisible, setSortModalVisible, ['None', 'Price: Low to High', 'Price: High to Low'], setSortOption)}
      <FlatList
        data={sortedProducts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
      />
    </>
  );
}

const styles = StyleSheet.create({
  productCard: {
    flex: 1,
    width: '45%',
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF6347',
    padding: 5,
    borderRadius: 5,
  },
  discountText: {
    color: 'white',
    fontWeight: 'bold',
  },
  productInfo: {
    padding: 10,
  },
  productInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  productPrice: {
    fontSize: 14,
    color: '#7C8139',
    marginTop: 7,
  },
  icon: {
    padding: 6,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    elevation: 2,
    zIndex: 1,
    marginTop: 7,
  },
  filterButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  filterButtonText: {
    fontSize: 16,
    color: '#333',
  },
  flatListContent: {
    paddingTop: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
  heartIcon: {
    padding: 6,
  },
  addToCartButton: {
    marginTop: 10,
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 5,
  },
});
