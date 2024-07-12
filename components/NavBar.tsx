import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import { Link } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

export default function Navbar() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Logo (Image) */}
      <Link to="/">
        <Image source={require('../Images/logo.jpg')} style={styles.logo} />
      </Link>

      {/* Search Bar (Input) */}
      <View style={styles.searchBarContainer}>
        <TextInput
          placeholder="Search"
          style={styles.searchBarInput}
        />
      </View>

      {/* Icons (Right Side) */}
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
          <Icon name="heart" size={24} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Bag')}>
          <Icon name="shopping-bag" size={24} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="bars" size={24} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#A86471',
    height: 120,
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingTop: 50,
    paddingBottom: 10,
 },
  logo: {
    width: 55,
    height: 55,
    borderRadius: 100, // Make logo circular
    marginRight: 15, // Margin between logo and search bar
  },
  searchBarContainer: {
    flex: 1, // Allow search bar to take up remaining space
    padding: 10,
    backgroundColor: '#fff', // White background for better contrast
    borderRadius: 15, // Rounded corners for search bar
    flexDirection: 'row',
  },
  searchBarInput: {
    flex: 1, // Fill the container
    fontSize: 16,
    paddingHorizontal: 15,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 15, // Margin between icons
  },
});
