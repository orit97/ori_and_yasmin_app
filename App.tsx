import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

////Pages
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Store from './pages/Store';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import HamburgerMenu from './components/HamburgerMenu';
import LoginPage from './pages/LoginPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="store" component={Store} />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="Register" component={Register} />
<Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Store" component={Store} />
          <Stack.Screen name="Admin" component={Admin} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="HamburgerMenu" component={HamburgerMenu} />
        </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});
