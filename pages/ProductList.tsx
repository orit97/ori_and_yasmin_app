import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StoreItem } from '../types/StoreItem';

type ProductListProps = {
  products: StoreItem[];
  onProductPress: (product: StoreItem) => void;
  onFavoritePress: (id: number) => void;
};

const ProductList: React.FC<ProductListProps> = ({ products, onProductPress, onFavoritePress }) => {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.productContainer}>
          <TouchableOpacity style={styles.productDetails} onPress={() => onProductPress(item)}>
            <Image source={{ uri: item.imag }} style={styles.productImage} />
            <View style={styles.productTextContainer}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onFavoritePress(item.id)}>
            <Icon
              name="heart"
              size={24}
              style={item.isFavorite ? styles.favoriteIconActive : styles.favoriteIcon}
            />
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  productDetails: {
    flexDirection: 'row',
    flex: 1,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  productTextContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
  },
  favoriteIcon: {
    color: '#ccc',
    marginLeft: 10,
  },
  favoriteIconActive: {
    color: '#f00',
    marginLeft: 10,
  },
});

export default ProductList;
