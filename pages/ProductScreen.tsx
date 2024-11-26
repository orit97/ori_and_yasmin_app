import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '../components/NavBar';

type RootStackParamList = {
  Product: { item: Product };
};

type ProductScreenRouteProp = RouteProp<RootStackParamList, 'Product'>;
type ProductScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Product'>;

interface Product {
  id: number;
  name: string;
  imag: string;
  currQty: number;
  price: number;
  discount?: number;
}

export default function Product() {
  const route = useRoute<ProductScreenRouteProp>();
  const { item } = route.params;
  const [addedToCart, setAddedToCart] = useState<boolean>(false);
  const [buttonGreen, setButtonGreen] = useState<boolean>(false);

  const handleAddToCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      const cart = storedCart ? JSON.parse(storedCart) : [];

      const existingProductIndex = cart.findIndex((p: Product) => p.id === item.id);

      if (existingProductIndex !== -1) {
        const cartProduct = cart[existingProductIndex];
        if (cartProduct.currQty < cartProduct.qtyLimit) {
          cartProduct.currQty += 1;
        } else {
          alert('You cannot add more than the available stock.');
          return;
        }
      } else {
        if (item.currQty > 0) {
          cart.push({
            id: item.id,
            name: item.name,
            imag: item.imag,
            price: item.price,
            discount: item.discount,
            qtyLimit: item.currQty, // Original stock quantity
            currQty: 1, // Initial quantity in the cart
          });
        } else {
          alert('This product is out of stock.');
          return;
        }
      }

      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      console.log('Cart updated:', cart);

      setButtonGreen(true);
      setAddedToCart(true);

      setTimeout(() => {
        setButtonGreen(false);
        setAddedToCart(false);
      }, 500);
    } catch (error) {
      console.error('Failed to add item to cart', error);
    }
  };

  return (
    <>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: item.imag }} style={styles.productImage} />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}₪</Text>
        {item.discount && <Text style={styles.productDiscount}>Discount: {item.discount}%</Text>}

        <TouchableOpacity
          style={[styles.addToCartButton, buttonGreen ? styles.buttonGreen : null]}
          onPress={handleAddToCart}
        >
          <Text style={styles.buttonText}>
            {addedToCart ? 'Added to Cart' : 'Add to Cart'}
          </Text>
          <Icon name="shopping-cart" size={20} color="#fff" style={styles.icon} />
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    color: '#333',
    marginBottom: 10,
  },
  productDiscount: {
    fontSize: 18,
    color: 'red',
    marginBottom: 10,
  },
  addToCartButton: {
    marginTop: 20,
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonGreen: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  icon: {
    marginLeft: 10,
  },
});
