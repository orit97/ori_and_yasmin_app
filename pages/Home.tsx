import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, ImageBackground, Animated, TouchableOpacity, Easing, StatusBar } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Navbar from '../components/NavBar';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// Define the navigation types
type RootStackParamList = {
  Home: undefined;
  Store: undefined;
  About: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // Fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    // Slide-up animation
    Animated.timing(translateAnim, {
      toValue: 0,
      duration: 1500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, translateAnim]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Navbar />
      <View style={styles.container}>
        <ImageBackground source={require('../assets/Images/background.jpg')} style={styles.background}>
          <View style={styles.overlay}>
            <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: translateAnim }] }]}>
              <Text style={styles.title}>Adam's Art Gallery</Text>
              <Text style={styles.subtitle}>A Journey Through Artistic Expression</Text>

              <TouchableOpacity
                onPress={() => navigation.navigate('Store')}
                style={styles.primaryButton}
              >
                <Text style={styles.primaryButtonText}>Explore Our Collection</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('About')}
                style={styles.secondaryButton}
              >
                <Text style={styles.secondaryButtonText}>About the Artist</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </ImageBackground>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Make sure the image covers the entire screen
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(232, 234, 220, 0.5)', // הכהייה קלה של הרקע כדי להבטיח שהטקסט הלבן ייראה בצורה ברורה
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1F1F1F', // צבע כהה הרבה יותר, קרוב לשחור
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF', // צבע לבן כדי להבליט את תת-הכותרת
    textAlign: 'center',
    marginBottom: 40,
    letterSpacing: 1,
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 999)', // הוספת צל לטקסט
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  primaryButton: {
    backgroundColor: '#8B7355', // צבע כהה יותר לכפתור
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700', // עבה יותר לכפתור
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  secondaryButton: {
    backgroundColor: '#6B4F36', // צבע אחיד כהה ושונה מהכפתור הראשי
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.3)', // צל יותר חזק
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 10,
  },
  secondaryButtonText: {
    color: '#FFFFFF', // צבע לבן לטקסט בכפתור המשני כדי להבטיח נראות
    fontSize: 16,
    fontWeight: '700', // עבה יותר לטקסט בכפתור המשני
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});


