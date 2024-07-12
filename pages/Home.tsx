import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../components/NavBar';
import { createStackNavigator } from '@react-navigation/stack';
// import store from '../pages/Store';


const Stack = createStackNavigator();

import backgroundImage from '../Images/background.jpg';

export default function Home() {
  const navigation = useNavigation();

  return (
    <>
      <Navbar />
      <SafeAreaView style={styles.container}>
        <View style={styles.background}>
          <Image source={backgroundImage} style={styles.backgroundImage} />
          {/* Linear Gradient Overlay */}
          <View style={styles.gradientOverlay} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Adam's Art</Text>
          <Text style={styles.tagline}>Discover unique and inspiring artwork</Text>

          {/* Call to action buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Store')}
              style={styles.button}
            >
              <Text style={styles.buttonText}>To the Store</Text>
            </TouchableOpacity>

          </View>
          {/* Add a footer section here */}

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
    backgroundColor: '#7C8139',
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
