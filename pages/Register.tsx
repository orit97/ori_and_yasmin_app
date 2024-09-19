import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // ייבוא DateTimePicker
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext'; // שימוש ב-UserContext
import { Address } from '../types/Address';
import { StackNavigationProp } from '@react-navigation/stack';

interface RegistrationState {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthDate: Date | null;
  password: string;
  confirmPassword: string;
  address: Address;
}

const RegistrationForm: React.FC = () => {
  const [state, setState] = useState<RegistrationState>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
    confirmPassword: '',
    birthDate: null,
    address: {
      street: '',
      city: '',
      homeNumber: 0,
    },
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const { login } = useUser(); // קבלת פונקציית login מההקשר
  const navigation = useNavigation(); // שימוש ב-React Navigation לניווט

  const handleInputChange = (name: keyof RegistrationState, value: string) => {
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setState((prevState) => ({ ...prevState, birthDate: selectedDate }));
    }
  };

  const calculateAge = (birthDate: Date): number => {
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(password);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async () => {
    if (!state.birthDate) {
      Alert.alert('Registration Error', 'Please select a birth date.');
      return;
    }

    const userAge = calculateAge(state.birthDate);

    if (userAge < 15) {
      Alert.alert('Registration Error', 'You must be at least 15 years old to register.');
      return;
    }

    if (!validateEmail(state.email)) {
      Alert.alert('Registration Error', 'Please enter a valid email address.');
      return;
    }

    if (!validatePassword(state.password)) {
      Alert.alert(
        'Registration Error',
        'Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.'
      );
      return;
    }

    if (state.password !== state.confirmPassword) {
      Alert.alert('Registration Error', 'Passwords do not match.');
      return;
    }

    if (!validatePhone(state.phone)) {
      Alert.alert('Registration Error', 'Phone number must be exactly 10 digits.');
      return;
    }

    // שמירת המשתמש ב-context
    login({
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      phone: state.phone,
      birthDate: state.birthDate,
      address: state.address,
    });

    // ניווט לפרופיל עם הנתונים
// אחרי ההרשמה
    navigation.navigate('Profile', { user: userDetails });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={state.email}
        onChangeText={(text) => handleInputChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={state.firstName}
        onChangeText={(text) => handleInputChange('firstName', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={state.lastName}
        onChangeText={(text) => handleInputChange('lastName', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={state.phone}
        onChangeText={(text) => handleInputChange('phone', text)}
      />

      {/* לחצן בחירת תאריך */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text>{state.birthDate ? state.birthDate.toDateString() : 'Select Birth Date'}</Text>
      </TouchableOpacity>

      {/* רכיב DateTimePicker */}
      {showDatePicker && (
        <DateTimePicker
          value={state.birthDate || new Date()} // אם אין תאריך, נשתמש בתאריך הנוכחי
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={state.password}
        onChangeText={(text) => handleInputChange('password', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={state.confirmPassword}
        onChangeText={(text) => handleInputChange('confirmPassword', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Street Address"
        value={state.address.street}
        onChangeText={(text) =>
          setState((prevState) => ({
            ...prevState,
            address: { ...prevState.address, street: text },
          }))
        }
      />

      <TextInput
        style={styles.input}
        placeholder="City"
        value={state.address.city}
        onChangeText={(text) =>
          setState((prevState) => ({
            ...prevState,
            address: { ...prevState.address, city: text },
          }))
        }
      />

      <Button title="Register" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f7f7f7',
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
});

export default RegistrationForm;
