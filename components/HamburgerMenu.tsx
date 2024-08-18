import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

const HamburgerMenu = () => {
  const navigation = useNavigation();

  const handleMenuPress = (screenName) => {
    navigation.navigate(screenName);
  };

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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Menu</Text>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Icon name="times" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.menuItems}>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('Home')}>
          <Icon name="home" size={18} color="black" />
          <Text style={styles.menuItemText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('Store')}>
          <Icon name="shopping-cart" size={18} color="black" />
          <Text style={styles.menuItemText}>Store</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('About')}>
          <Icon name="info-circle" size={18} color="black" />
          <Text style={styles.menuItemText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('Login')}>
          <Icon name="lock" size={18} color="black" />
          <Text style={styles.menuItemText}>Login</Text>
        </TouchableOpacity>

        {/* Artistic Line Decoration */}
        <View style={styles.decorativeLine} />

        {/* Contact & Follow Section */}
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Contact & Follow</Text>
          <View style={styles.contactLinks}>
            <TouchableOpacity style={styles.contactItem} onPress={openPhone}>
              <Icon name="phone" size={18} color="black" />
              <Text style={styles.contactText}>+972-50-123-4567</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactItem} onPress={openEmail}>
              <Icon name="envelope" size={18} color="black" />
              <Text style={styles.contactText}>adam.raz.art@gmail.com</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactItem} onPress={openInstagram}>
              <Icon name="instagram" size={18} color="black" />
              <Text style={styles.contactText}>@adam_raz_art</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactItem} onPress={openWebsite}>
              <Icon name="globe" size={18} color="black" />
              <Text style={styles.contactText}>www.adamrazart.com</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  closeButton: {
    padding: 10,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  menuItems: {
    flex: 1,
    width: '100%',
  },
  menuItem: {
    paddingVertical: 20,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 18,
    marginLeft: 10,
  },
  decorativeLine: {
    borderBottomColor: '#7C8139',
    borderBottomWidth: 2,
    marginVertical: 15,
    width: '50%',
    alignSelf: 'center',
  },
  contactSection: {
    marginTop: 30,
  },
  contactTitle: {
    fontSize: 18,
    marginBottom: 20,
    color: 'black',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  contactLinks: {
    paddingLeft: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  contactText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 10,
  },
});

export default HamburgerMenu;
