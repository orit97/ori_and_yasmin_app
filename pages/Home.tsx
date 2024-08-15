import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../components/NavBar';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// Define the navigation types
type RootStackParamList = {
  Home: undefined;
  Store: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <>
      <Navbar />
      <SafeAreaView style={styles.container}>
        <View style={styles.background}>
          <Image source={require('../assets/Images/background.jpg')} style={styles.backgroundImage} />
          <View style={styles.gradientOverlay} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Adam's Art</Text>
          <Text style={styles.tagline}>Discover unique and inspiring artwork</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Store')}
              style={styles.button}
            >
              <Text style={styles.buttonText}>To the Store</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  tagline: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 2,
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#77794A',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adjust opacity for desired darkness
  },
});