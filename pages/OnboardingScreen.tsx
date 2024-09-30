import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LottieView from 'lottie-react-native';

// Define the navigation types
type RootStackParamList = {
  Home: undefined;
  Onboarding: undefined;
};

type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();

  const handleGetStarted = () => {
    navigation.navigate('Home');
  };

  return (
    <Swiper style={styles.wrapper} showsButtons={false} loop={false} dotColor="#999" activeDotColor="#4CAF50">
      {/* Onboarding Screen 1 */}
      <View style={[styles.slide, { backgroundColor: '#FFE4C4' }]}>
        <LottieView 
          source={require('../assets/Animations/artGalleryAnimation.json')} 
          autoPlay 
          loop 
          style={styles.animation}
        />
        <Text style={styles.title}>Welcome to Adam raz's Art Gallery!</Text>
        <Text style={styles.text}>Discover unique and breathtaking art pieces directly from the studio.</Text>
        <Image source={require('../assets/Images/artist.jpg')} style={styles.image} />
      </View>

      {/* Onboarding Screen 2 */}
      <View style={[styles.slide, { backgroundColor: '#F0E68C' }]}>
        <LottieView 
          source={require('../assets/Animations/purchaseAnimation.json')} 
          autoPlay 
          loop 
          style={styles.animation}
        />
        <Text style={styles.title}>Buy Original Artworks</Text>
        <Text style={styles.text}>Support creativity by purchasing original art from Adam raz.</Text>
        <Image source={require('../assets/Images/purchase.jpg')} style={styles.image} />
      </View>

      {/* Onboarding Screen 3 */}
      <View style={[styles.slide, { backgroundColor: '#E0FFFF' }]}>
        <LottieView 
          source={require('../assets/Animations/kidsWorkshop.json')} 
          autoPlay 
          loop 
          style={styles.animation}
        />
        <Text style={styles.title}>Join Our Kid's Art Workshops</Text>
        <Text style={styles.text}>Help your kids develop their creativity with fun and engaging workshops.</Text>
        <Image source={require('../assets/Images/kid.jpg')} style={styles.image} />
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </Swiper>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  animation: {
    width: width * 0.5,
    height: height * 0.2,
  },
  image: {
    width: '90%',
    height: '40%',
    resizeMode: 'contain',
    marginBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginHorizontal: 30,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    position: 'absolute',
    bottom: 70,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;