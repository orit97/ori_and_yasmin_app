import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Navbar from '../components/NavBar';

interface Product {
  id: number;
  name: string;
  imag: string | any;
  price?: number;
  discount?: number;
  category: string;
}

const mockProducts: Product[] = [
  { id: 1, name: "Ocean", imag: require('../assets/Images/Ocean.jpg'), price: 150, discount: 15, category: "water colors" },
  { id: 2, name: "Pink Storm", imag: require('../assets/Images/pink.jpg'), price: 200, category: "oil colors" },
  { id: 3, name: "Rainbow", imag: require('../assets/Images/rainbow.jpg'), price: 180, discount: 10, category: "oil colors" },
  // Add more mock products here...
];

const WishlistScreen: React.FC = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const loadFavorites = async () => {
        try {
          const storedFavorites = await AsyncStorage.getItem('wishlist');
          if (storedFavorites) {
            const wishlist:Product[] = JSON.parse(storedFavorites);
            
          
            setFavorites(wishlist);
            console.log(wishlist);
          }
        } catch (error) {
          console.error('Failed to load wishlist:', error);
          setFavorites([]);
        }
      };
      loadFavorites();
    }, [])
  );

  const handleRemoveFromWishlist = async (productId: number) => {
    try {
      const storedFavorites = await AsyncStorage.getItem('wishlist');
      const wishlist: number[] = storedFavorites ? JSON.parse(storedFavorites) : [];
      const updatedWishlist = wishlist.filter((id) => id !== productId);
      await AsyncStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setFavorites((prev) => prev.filter((item) => item.id !== productId));
    } catch (error) {
      console.error('Failed to remove item from wishlist:', error);
    }
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <TouchableOpacity style={styles.imageContainer}>
        <Image
          source={typeof item.imag === 'string' ? { uri: item.imag } : item.imag}
          style={styles.productImage}
        />
        {item.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}% OFF</Text>
          </View>
        )}
      </TouchableOpacity>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>
          {item.price ? `${item.price}₪` : 'Price Unavailable'}
        </Text>
        <TouchableOpacity
          onPress={() => handleRemoveFromWishlist(item.id)}
          style={styles.removeButton}
        >
          <Icon name="trash" size={20} color="#FF6347" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <Navbar />
      <View style={styles.container}>
        <Text style={styles.header}>Favorites</Text>
        {favorites.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Your wishlist is empty!</Text>
          </View>
        ) : (
          <FlatList
            data={favorites}
            renderItem={renderItem}
            keyExtractor={(item:any) => item.id}
            numColumns={2}
            contentContainerStyle={styles.flatListContent}
          />
        )}
      </View>
    </>
  );
};

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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF6347',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
  discountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  productInfo: {
    padding: 10,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#7C8139',
    marginBottom: 10,
  },
  removeButton: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
});


export default WishlistScreen;
