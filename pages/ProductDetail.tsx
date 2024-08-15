import React from 'react';
import { View, Text, Image, Button, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RouteProp } from '@react-navigation/native';
import { StoreItem } from '../types/StoreItem';


type ProductDetailProps = {
  route: RouteProp<{ params: { product: StoreItem } }, 'params'>;
};

const ProductDetail: React.FC<ProductDetailProps> = ({ route }) => {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.imag }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>${product.price}</Text>
      <Text style={styles.productDesc}>{product.longDesc}</Text>
      <Button title="Add to Cart" onPress={() => {/* Add to cart logic */}} />
      <TouchableOpacity onPress={() => {/* Toggle favorite logic */}}>
        <Icon
          name="heart"
          size={24}
          style={product.isFavorite ? styles.favoriteIconActive : styles.favoriteIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    flex: 1,
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  productPrice: {
    fontSize: 20,
    color: '#888',
    marginVertical: 5,
  },
  productDesc: {
    fontSize: 16,
    color: '#666',
  },
  favoriteIcon: {
    color: '#ccc',
    marginTop: 10,
  },
  favoriteIconActive: {
    color: '#f00',
    marginTop: 10,
  },
});

export default ProductDetail;
