// Import necessary libraries and components
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import pages and components
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Store from './pages/Store';
import Admin from './pages/Admin';
import LoginPage from './pages/LoginPage';
import HamburgerMenu from './components/HamburgerMenu';
import ProductScreen from './pages/ProductScreen';
import FavoritesScreen from './pages/FavoritesScreen';
import CartScreen from './pages/CartScreen';
import { CartProvider } from './contexts/CartContext'; 

const Stack = createStackNavigator();

// Main App component
export default function App() {
  return (
    <CartProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Store" component={Store} />
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Admin" component={Admin} />
            <Stack.Screen name="HamburgerMenu" component={HamburgerMenu} />
            <Stack.Screen name="Product" component={ProductScreen} />
            <Stack.Screen name="Favorites" component={FavoritesScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </CartProvider>
  );
}

// Styles for the App component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
