import React,{useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView,Button } from 'react-native';
import { useUser } from '../contexts/UserContext';
import Navbar from '../components/NavBar';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen: React.FC = () => {
  const { user,logout } = useUser(); // Access user data from context
  const navigation= useNavigation();
  // Redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      navigation.navigate('Login'); // Redirect to Login if user is not logged in
    }
  }, [user, navigation]);

  // If user data is not available, return null (since useEffect will handle the redirection)
  if (!user) {
    return;
  }

  return (
    <>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Profile</Text>
        
        <View style={styles.profileItem}>
          <Text style={styles.label}>First Name:</Text>
          <Text style={styles.value}>{user.firstName}</Text>
        </View>

        <View style={styles.profileItem}>
          <Text style={styles.label}>Last Name:</Text>
          <Text style={styles.value}>{user.lastName}</Text>
        </View>

        <View style={styles.profileItem}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>

        <View style={styles.profileItem}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{user.phone}</Text>
        </View>

        <View style={styles.profileItem}>
          <Text style={styles.label}>Birth Date:</Text>
          <Text style={styles.value}>{new Date(user.birthDate).toDateString()}</Text>
        </View>

        <View style={styles.profileItem}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>
            {user.address.street}, {user.address.city}, {user.address.homeNumber}
          </Text>
        </View>
          <Button title="Logout" onPress={logout} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
    alignSelf: 'stretch',
  },
  profileItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    width: '100%',
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7c7c7c',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: '#333',
  },
  noUserText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#ff0000',
  },
});

export default ProfileScreen;
