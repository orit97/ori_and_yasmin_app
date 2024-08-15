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
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={require('../assets/Images/logo.jpg')} style={styles.logo} />
      </TouchableOpacity>

      <View style={styles.searchBarContainer}>
        <TextInput
          placeholder="Search"
          style={styles.searchBarInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch} // Trigger search on enter key
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Icon name="search" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
          <Icon name="heart" size={24} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.cartIconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Icon name="shopping-bag" size={24} style={styles.icon} />
          </TouchableOpacity>
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('HamburgerMenu')}>
          <Icon name="bars" size={24} style={styles.icon} />
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
    paddingHorizontal: 15,
    backgroundColor: '#BDAE9A',
    height: 130,
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingTop: 60,
    paddingBottom: 20,
  },
  logo: {
    width: 55,
    height: 55,
    borderRadius: 100,
    marginRight: 15,
  },
  searchBarContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBarInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 15,
  },
  searchButton: {
    paddingHorizontal: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 15,
  },
  cartIconContainer: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    right: -10,
    top: -10,
    backgroundColor: 'red',
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
