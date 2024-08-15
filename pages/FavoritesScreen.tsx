import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons
import Navbar from '../components/NavBar';

// Define the Product interface
interface Product {
  id: number;
  name: string;
  shortDesc: string;
  longDesc?: string;
  imag: any; // 'any' type to handle local images using require()
  minQty?: number;  // Optional
  currQty?: number; // Optional
  price?: number;   // Optional
  discount?: number;
  category: string;
}

// Define the navigation stack parameter list
type RootStackParamList = {
  Home: undefined;
  Favorites: undefined;
  Product: { item: Product };
};

// Define the navigation prop type for FavoritesScreen
type FavoritesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Favorites'>;

const mockProducts: Product[] = [
  { id: 1, name: "Ocean", shortDesc: "water colors", longDesc: "", imag: require('../assets/Images/Ocean.jpg'), minQty: 1, currQty: 1, price: 150, discount: 15, category: "water colors" },
  { id: 2, name: "Pink storm", shortDesc: "oil colors", longDesc: "", imag: require('../assets/Images/pink.jpg'), minQty: 1, currQty: 1, price: 200,  category: "oil colors" },
  { id: 3, name: "Rainbow", shortDesc: "oil colors", longDesc: "", imag: require('../assets/Images/rainbow.jpg'), minQty: 1, currQty: 1, price: 180, discount: 10, category: "oil colors" },
  { id: 4, name: "Childhood", shortDesc: "water colors", longDesc: "", imag: require('../assets/Images/childhood.jpg'), minQty: 1, currQty: 1, price: 120, discount: 5, category: "water colors" },
  { id: 8, name: "Sad Storm", shortDesc: "oil colors", longDesc: "", imag: require('../assets/Images/obb.jpg'), minQty: 1, currQty: 1, price: 170, discount: 12, category: "abstract" },
  { id: 10, name: "Yellow Storm", shortDesc: "oil colors", longDesc: "", imag: require('../assets/Images/yellow.jpg'), minQty: 1, currQty: 1, price: 140, category: "abstract" },
  { id: 11, name: "Pain", shortDesc: "emotional art", longDesc: "", imag: require('../assets/Images/pain.jpg'), minQty: 1, currQty: 1, price: 190, discount: 18, category: "abstract" },
  { id: 12, name: "Mysterious Woman", shortDesc: "portrait", longDesc: "", imag: require('../assets/Images/women.jpg'), minQty: 1, currQty: 1, price: 210,  category: "portrait" },
  { id: 13, name: "Waves", shortDesc: "water colors", longDesc: "", imag: require('../assets/Images/waves.jpg'), minQty: 1, currQty: 1, price: 160, discount: 14, category: "water colors" },
  { id: 14, name: "Kitty Cat", shortDesc: "animal art", longDesc: "", imag: require('../assets/Images/cat.jpg'), minQty: 1, currQty: 1, price: 125, discount: 9, category: "animals" },
  { id: 15, name: "Love of Fox Mom", shortDesc: "animal art", longDesc: "", imag: require('../assets/Images/fox.jpg'), minQty: 1, currQty: 1, price: 200,  category: "animals" },
  { id: 16, name: "Blue Storm", shortDesc: "oil colors", longDesc: "", imag: require('../assets/Images/blue.jpg'), minQty: 1, currQty: 1, price: 180, discount: 15, category: "abstract" },
  { id: 17, name: "Forest", shortDesc:"oil colors", longDesc: "", imag: require('../assets/Images/trees.jpg'), minQty: 1, currQty: 1, price: 150,  category: "abstract" },
  { id: 18, name: "Lonly fish", shortDesc: "water colors", longDesc: "", imag: require('../assets/Images/fish.jpg'), minQty: 1, currQty: 1, price: 120,  category: "water colors" },
];

export default function FavoritesScreen() {
  const navigation = useNavigation<FavoritesScreenNavigationProp>();
  const [favorites, setFavorites] = useState<Product[]>([]);
  
  useFocusEffect(
    React.useCallback(() => {
      const loadFavorites = async () => {
        try {
          const storedFavorites = await AsyncStorage.getItem('wishlist');
          if (storedFavorites) {
            const wishlistIds = JSON.parse(storedFavorites);
            const filteredProducts = mockProducts.filter(product => wishlistIds.includes(product.id));
            setFavorites(filteredProducts);
          }
        } catch (error) {
          console.error('Failed to load wishlist from storage', error);
        }
      };
  
      loadFavorites();
    }, [])
  );

  const handleRemoveFromWishlist = async (productId: number) => {
    try {
      const storedFavorites = await AsyncStorage.getItem('wishlist');
      const wishlist: number[] = storedFavorites ? JSON.parse(storedFavorites) : [];
      const updatedWishlist = wishlist.filter(id => id !== productId);

      await AsyncStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setFavorites(prevFavorites => prevFavorites.filter(item => item.id !== productId));
    } catch (error) {
      console.error('Failed to remove item from wishlist', error);
    }
  };
  
  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <TouchableOpacity style={styles.imageContainer} onPress={() => navigation.navigate('Product', { item })}>
        <Image source={item.imag} style={styles.productImage} />
        {item.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}% OFF</Text>
          </View>
        )}
      </TouchableOpacity>
      <View style={styles.productInfo}>
        <View style={styles.productInfoHeader}>
          <Text style={styles.productName}>{item.name}</Text>
          <TouchableOpacity onPress={() => handleRemoveFromWishlist(item.id)} style={styles.removeButton}>
            <Icon name="trash" size={20} color="#FF6347" />
          </TouchableOpacity>
        </View>
        <Text style={styles.productPrice}>{item.price ? `${item.price}₪` : "Price Unavailable"}</Text>
      </View>
    </View>
  );
  
  return (
    <>
    <Navbar/>
    <View style={styles.container}>
      <Text style={styles.header}>Favorites</Text>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
    </>
  );
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingTop: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    alignSelf: 'center',
  },
  productCard: {
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
  removeButton: {
    padding: 5,
  },
  flatListContent: {
    paddingBottom: 20,
  },
});
