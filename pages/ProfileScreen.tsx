import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  Button,
} from 'react-native';

interface ProfileProps {
  route: any; // פרופס המתקבלים מהניווט
}

const ProfileScreen: React.FC<ProfileProps> = ({ route }) => {
  const { user } = route.params;

  useEffect(() => {
    // הודעת ברכה לאחר ההרשמה/התחברות
    Alert.alert('Welcome!', `Welcome to your profile, ${user.firstName}!`);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Profile</Text>

      {/* תצוגת תמונה (אם יש תמונה לפרופיל) */}
      {user.image ? (
        <Image source={{ uri: user.image }} style={styles.profileImage} />
      ) : (
        <Image
          source={require('../assets/default-profile.png')}
          style={styles.profileImage}
        />
      )}

      <View style={styles.profileInfo}>
        <Text style={styles.label}>Full Name:</Text>
        <Text style={styles.value}>
          {user.firstName} {user.lastName}
        </Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>

        <Text style={styles.label}>Phone Number:</Text>
        <Text style={styles.value}>{user.phone}</Text>

        <Text style={styles.label}>Date of Birth:</Text>
        <Text style={styles.value}>{new Date(user.birthDate).toDateString()}</Text>

        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>
          {user.address.street}, {user.address.city}, {user.address.homeNumber}
        </Text>
      </View>

      <Button title="Log out" onPress={() => Alert.alert('Logged Out', 'You have been logged out successfully!')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f7f7f7',
    flexGrow: 1,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30,
    textAlign: 'center',
    color: '#333',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 30,
  },
  profileInfo: {
    width: '100%',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
  },
  value: {
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
  },
});

export default ProfileScreen;
