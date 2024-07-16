import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

const HamburgerMenu = () => {
  const navigation = useNavigation();

  const handleMenuPress = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Menu</Text>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Icon name="times" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.menuItems}>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('Home')}>
          <Text style={styles.menuItemText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('Store')}>
          <Text style={styles.menuItemText}>Store</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('About')}>
          <Text style={styles.menuItemText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('Login')}>
          <Text style={styles.menuItemText}>Login</Text>
          <Icon name="lock" size={18} color="black" style={styles.loginIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2', // Light gray background
    padding: 20,
    paddingTop: 40,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    shadowColor: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Maintains space between elements
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  closeButton: {
    padding: 10,
    width: 50, // Same size as hamburger menu
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold', // Optional: Add boldness for emphasis
  },
  menuItems: {
    flex: 1,
    width: '100%',
  },
  menuItem: {
    paddingVertical: 25,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginBottom: 10,
    flexDirection: 'row', // Arrange elements horizontally
    justifyContent: 'space-between', // Align content horizontally
  },
  menuItemText: {
    fontSize: 18,
  },
  loginIcon: {
    // No spacing needed as arrangement is controlled by 'menuItem'
  },
});

export default HamburgerMenu;
