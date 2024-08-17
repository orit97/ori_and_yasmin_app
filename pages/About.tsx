import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

const About: React.FC = () => {

  const openEmail = () => {
    Linking.openURL('mailto:adam.raz.art@gmail.com');
  };

  const openInstagram = () => {
    Linking.openURL('https://www.instagram.com/adam_raz_art');
  };

  const dialPhoneNumber = () => {
    Linking.openURL('tel:+972501234567');
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
      <Image source={require('../assets/Images/artist.jpg')} style={styles.image} />
      <Text style={styles.header}>Adam Raz</Text>
      <Text style={styles.subHeader}>Contemporary Artist from Jerusalem</Text>

      <View style={styles.section}>
        <FontAwesome name="user" size={24} color="#7C8139" style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.sectionTitle}>About Adam</Text>
          <Text style={styles.text}>
            Adam Raz, 26, is a contemporary artist from Jerusalem. His art spans across various styles, including watercolor paintings, oil paintings, abstract art, emotional expressionism, portraits, and animal art. Adam’s work blends these diverse elements to reflect modern life in Israel.
          </Text>
        </View>
      </View>

      <View style={styles.separator} />

      <View style={styles.section}>
        <MaterialIcons name="palette" size={24} color="#7C8139" style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.sectionTitle}>Workshops for Kids</Text>
          <Image source={require('../assets/Images/workshop.jpg')} style={styles.workshopImage} />
          <Text style={styles.text}>
            Adam offers creative workshops designed for children, helping them explore art in a fun, supportive environment.{' '}
            <Text style={styles.link} onPress={openEmail}>
              Contact him
            </Text>{' '}
            to enroll your child.
          </Text>
        </View>
      </View>

      <View style={styles.separator} />

      <View style={styles.section}>
        <FontAwesome name="envelope" size={24} color="#7C8139" style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.sectionTitle}>Contact & Follow</Text>
          <Text style={styles.text}>
            Stay updated by following Adam on Instagram{' '}
            <Text style={styles.link} onPress={openInstagram}>
              @adam_raz_art
            </Text>. For inquiries, reach out via email or phone at{' '}
            <Text style={styles.link} onPress={dialPhoneNumber}>
              +972-50-1234567
            </Text>.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 50,
    paddingTop: 70,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#7C8139',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
    marginTop: 3,
  },
  textContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginTop: 5,
  },
  link: {
    color: '#7C8139',
    textDecorationLine: 'underline',
  },
  workshopImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 5,
    resizeMode: 'cover',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 20,
  },
});

export default About;
