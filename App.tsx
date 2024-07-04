import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

////Pages
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Login from './pages/Login';
import Store from './pages/Store';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import React from 'react';

const Stack=createStackNavigator();

export default function App() {
  return (

    <View>
      <Text>
        jjjjj
      </Text>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
/*
<NavigationContainer>
	<Stack.Navigator>
<Stack.Screen name="Home" component={Home} />
<Stack.Screen name="About" component={About} />
<Stack.Screen name="Register" component={Register} />
<Stack.Screen name="Login" component={Login} />
<Stack.Screen name="Store" component={Store} />
<Stack.Screen name="Admin" component={Admin} />
<Stack.Screen name="Cart" component={Cart} />
</Stack.Navigator>
</NavigationContainer>
 */