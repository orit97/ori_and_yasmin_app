import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StoreItem } from '../types/StoreItem'; // Adjust this path accordingly

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
      numColumns={2}
      renderItem={({ item }) => (
        <View style={styles.productContainer}>
          <TouchableOpacity style={styles.productDetails} onPress={() => onProductPress(item)}>
            <Image source={{ uri: item.imag }} style={styles.productImage} />
            <View style={styles.productTextContainer}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}₪</Text>
              {item.discount && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{item.discount}% OFF</Text>
                </View>
              )}
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
      contentContainerStyle={styles.flatListContent}
    />
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  productDetails: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  productTextContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
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
  favoriteIcon: {
    color: '#ccc',
    marginTop: 10,
  },
  favoriteIconActive: {
    color: '#f00',
    marginTop: 10,
  },
  flatListContent: {
    paddingHorizontal: 10,
  },
});

export default ProductList;
