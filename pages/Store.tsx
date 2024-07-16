import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../components/NavBar';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

// Interface for Product data type
interface Product {
  [x: string]: any;
  id: number;
  name: string;
  shortDesc: string;
  longDesc?: string;
  imag: string;
  minQty: number;
  currQty: number;
  price: number;
  discount?: number;
  category: string;
}

const mockProducts = [ // Replace with your actual product data
  {
    id: 1,
    name: ' The Starry Night',
    shortDesc: 'A replica of Van Gogh\'s masterpiece',
    imag: 'https://images.unsplash.com/photo-1646988423425-bc236bc449bd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fGFydGlzdHxlbnwwfHwwfHx8Mg%3D%3D', // Replace with your image URL
    minQty: 1,
    currQty: 10,
    price: 99.99,
    category: 'Paintings',
  },
  {
    id: 2,
    name: 'Thinker Statue',
    shortDesc: 'A replica of Rodin\'s iconic sculpture',
    imag: 'https://images.unsplash.com/photo-1589996448606-27d38c70f3bc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fGFydGlzdHxlbnwwfHwwfHx8Mg%3D%3D', // Replace with your image URL
    minQty: 1,
    currQty: 5,
    price: 149.99,
    category: 'Sculptures',
  },
  {
    id: 3,
    name: 'The Persistence of Memory',
    shortDesc: 'A photograph of Rembrandt\'s Persistence of Memory',
    imag: 'https://images.unsplash.com/photo-1634393295821-70a0dea57209?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODZ8fGFydGlzdHxlbnwwfHwwfHx8Mg%3D%3D', // Replace with your image URL
    minQty: 1,
    currQty: 20,
    price: 79.99,
    category: 'Photographs',
  },
  {
    id: 4,
    name: 'The Last Supper ',
    shortDesc: 'A drawing of the Last Supper by Johannes Vermeer named "The Last Supper" in 1665 ',  
    imag: 'https://images.unsplash.com/photo-1658303033408-ff2a7e39a554?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODF8fGFydGlzdHxlbnwwfHwwfHx8Mg%3D%3D', // Replace with your image URL
    minQty: 1,
    currQty: 15,
    price: 39.99,
    category: 'Drawings',
  },

];

export default function Store() {
  const navigation = useNavigation();

  const [wishlist, setWishlist] = useState<number[]>([]); // Array of product IDs
  const [products, setProducts] = useState<Product[]>(mockProducts.map(product => ({ ...product, isLiked: false }))); // Add isLiked property with initial value false

  const handleLikePress = (productId: number) => {
    setProducts(prevProducts =>
      prevProducts.map(product => (product.id === productId ? { ...product, isLiked: !product.isLiked } : product))
    );

    // Add/remove product from wishlist based on liked state
    if (!wishlist.includes(productId) && products.find(p => p.id === productId)?.isLiked) {
      setWishlist(prevWishlist => [...prevWishlist, productId]);
    } else {
      setWishlist(prevWishlist => prevWishlist.filter(id => id !== productId));
    }
  };

  const renderItem = ({ item }: { item: Product }) => {
    return (
      <TouchableOpacity style={styles.productCard} onPress={() => navigation.navigate('Product', { item })}>
        <Image source={{ uri: item.imag }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>{item.price}₪</Text>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => handleLikePress(item.id)}>
            <Icon
              name="heart"
              size={24}
              style={[styles.icon, item.isLiked ? { color: 'black' } : { color: 'white' }]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <View style={styles.addToCartContainer}>
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Navbar />
      <FlatList
        data={products} // Use the updated products state
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
      />
    </>
  );
}
const styles = StyleSheet.create({
  addToCartContainer: {
    borderRadius: 5, // Rounded corners
    backgroundColor: '#7C8139', // Button background color
    justifyContent: 'center', // Center the text
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // Increase shadow for a more elevated look
    padding: 10, // Adjust padding for text fit
    marginTop: 5,
  },
  addToCartText: {
    fontSize: 16, // Slightly increase font size for better readability
    fontWeight: 'bold',
    color: '#fff',
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
    marginTop: 20,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#7C8139',
    marginTop: 7,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    padding: 10,
  },
  icon: {
    color: 'white',
    backgroundColor: '#BA555C', // Background color for the heart icon
    justifyContent: 'center', // Center the text
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // Increase shadow for a more elevated look
    padding: 6, // Adjust padding for text fit
    marginTop: 5,
  },

});
