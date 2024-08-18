import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Image } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const Footer: React.FC = () => {
  const openEmail = () => {
    Linking.openURL('mailto:adam.raz.art@gmail.com');
  };

  const openInstagram = () => {
    Linking.openURL('https://www.instagram.com/adam_raz_art');
  };

  const openPhone = () => {
    Linking.openURL('tel:+972501234567');
  };

  const openWebsite = () => {
    Linking.openURL('https://www.adamrazart.com'); // Example website URL
  };

  return (
    <View style={styles.footer}>
      <Text style={styles.footerTitle}>Adam Raz Art</Text>
      <Text style={styles.footerQuote}>"Art is the bridge between the soul and the world."</Text>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={openPhone} style={styles.iconButton}>
          <FontAwesome name="phone" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={openEmail} style={styles.iconButton}>
          <MaterialIcons name="email" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={openInstagram} style={styles.iconButton}>
          <FontAwesome name="instagram" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={openWebsite} style={styles.iconButton}>
          <FontAwesome name="globe" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.contactInfo}>
        <Text style={styles.contactText}>Phone: +972-50-123-4567</Text>
        <Text style={styles.contactText}>Email: adam.raz.art@gmail.com</Text>
        <Text style={styles.contactText}>Website: www.adamrazart.com</Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.additionalLinks}>
        <TouchableOpacity onPress={openWebsite} style={styles.linkButton}>
          <Text style={styles.linkText}>Visit Our Website</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openEmail} style={styles.linkButton}>
          <Text style={styles.linkText}>Join Our Newsletter</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerSubText}>© 2024 Adam Raz - All Rights Reserved</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#333',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  footerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  footerQuote: {
    color: '#aaa',
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  iconButton: {
    marginHorizontal: 15,
  },
  contactInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  contactText: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
  },
  separator: {
    width: '80%',
    height: 1,
    backgroundColor: '#555',
    marginVertical: 20,
  },
  additionalLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  linkButton: {
    marginHorizontal: 10,
  },
  linkText: {
    color: '#7C8139',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  footerSubText: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Footer;
