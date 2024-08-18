import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useCart } from '../contexts/CartContext';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the types for navigation stack
type RootStackParamList = {
  Home: undefined;
  Store: undefined;
  About: undefined;
  Login: undefined;
  SignIn: undefined;
  Favorites: undefined;
  Cart: undefined;
  HamburgerMenu: undefined;
};

type NavbarNavigationProp = StackNavigationProp<RootStackParamList>;

export default function Navbar() {
  const navigation = useNavigation<NavbarNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');

  const { cartCount } = useCart();

  const handleSearch = () => {
    const query = searchQuery.trim().toLowerCase();
    switch (query) {
      case 'home':
        navigation.navigate('Home');
        break;
      case 'store':
        navigation.navigate('Store');
        break;
      case 'about':
        navigation.navigate('About');
        break;
      case 'login':
        navigation.navigate('Login');
        break;
      case 'sign in':
        navigation.navigate('SignIn');
        break;
      default:
        Alert.alert('Not Found', 'No matching page found for your search query.');
        break;
    }
    setSearchQuery(''); // מנקה את שדה החיפוש לאחר ביצוע החיפוש
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.logoContainer}>
        <Image source={require('../assets/Images/logo.jpg')} style={styles.logo} />
      </TouchableOpacity>

      <View style={styles.searchBarContainer}>
        <Icon name="search" size={18} color="#B5B5B5" style={styles.searchIcon} />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#B5B5B5"
          style={styles.searchBarInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
      </View>

      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
          <Icon name="heart" size={24} style={styles.icon} color="#6B4F36" />
        </TouchableOpacity>
        <View style={styles.cartIconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Icon name="shopping-cart" size={24} style={styles.icon} color="#6B4F36" />
          </TouchableOpacity>
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('HamburgerMenu')}>
          <Icon name="bars" size={24} style={styles.icon} color="#6B4F36" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles for the Navbar component
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1BAA2', // צבע רקע חדש ל-NAVBAR, מעט שונה אך קרוב לקודם
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  logoContainer: {
    marginRight: 20,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6D3C2', // צבע רקע חדש לשורת החיפוש, מעט בהיר יותר
    borderRadius: 30, // קצוות עגולים יותר
    paddingHorizontal: 15,
    paddingVertical: 8, // גובה חיפוש מעט יותר גבוה
    marginRight: 20, // מרווח בין החיפוש לאייקונים
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBarInput: {
    flex: 1,
    fontSize: 16,
    color: '#5C5C5C', // צבע טקסט רך
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 20,
    color: '#6B4F36', // צבע אייקונים שתואם לכפתור המשני
  },
  cartIconContainer: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    right: -10,
    top: -10,
    backgroundColor: '#8C5A42', // צבע תגים חדש, כהה יותר אך עדיין מתאים לפלטת הצבעים
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});



