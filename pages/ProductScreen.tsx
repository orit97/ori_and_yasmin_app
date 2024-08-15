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
  shortDesc: string;
  longDesc?: string;
  imag: any;
  minQty: number;
  currQty: number;  // מייצג את הכמות המקסימלית במלאי
  price: number;
  discount?: number;
  category: string;
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
        // אם המוצר כבר בעגלה, נוודא שלא נחרוג מהמלאי המקסימלי
        if (cart[existingProductIndex].currQty < item.currQty) {
          cart[existingProductIndex].currQty += 1;
        } else {
          alert('לא ניתן להוסיף יותר יחידות מהמלאי הזמין.');
          return;
        }
      } else {
        // אם המוצר לא בעגלה, נוסיף אותו עם כמות התחלתית של 1
        if (item.currQty > 0) {
          cart.push({ ...item, currQty: 1 });
        } else {
          alert('המוצר אינו זמין במלאי.');
          return;
        }
      }

      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      console.log('Product added to cart:', cart);

      // שינוי צבע הכפתור לירוק לאחר הוספה לעגלה והחזרתו לצבע המקורי לאחר חצי שנייה
      setButtonGreen(true);
      setAddedToCart(true);

      setTimeout(() => {
        setButtonGreen(false);
        setAddedToCart(false); // אפשרות ללחוץ על הכפתור שוב
      }, 500);

    } catch (error) {
      console.error('Failed to add item to cart', error);
    }
  };

  return (
    <>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={item.imag} style={styles.productImage} />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}₪</Text>
        {item.discount && (
          <Text style={styles.productDiscount}>Discount: {item.discount}%</Text>
        )}
        <Text style={styles.productShortDesc}>{item.shortDesc}</Text>
        {item.longDesc ? (
          <Text style={styles.productLongDesc}>{item.longDesc}</Text>
        ) : null}

        <TouchableOpacity
          style={[
            styles.addToCartButton,
            buttonGreen ? styles.buttonGreen : null,
          ]}
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
  productShortDesc: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  productLongDesc: {
    fontSize: 14,
    color: '#666',
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
