import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Address } from '../types/Address';

interface RegistrationState {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  image: string | null;
  birthDate: Date;
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
    image: null,
    password: '',
    confirmPassword: '',
    birthDate: new Date(),
    address: {
      street: '',
      city: '',
      homeNumber: 0,
    },
  });

  const handleInputChange = (name: keyof RegistrationState, value: string) => {
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || state.birthDate;
    setState((prevState) => ({ ...prevState, birthDate: currentDate }));
  };

  const handleImageUpload = () => {
    launchImageLibrary(
      { mediaType: 'photo', includeBase64: false },
      (response) => {
        if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0].uri || null;
          setState((prevState) => ({ ...prevState, image: selectedImage }));
        }
      }
    );
  };

  const handleSubmit = async () => {
    // Validate user input (email format, password strength, etc.)
    // If validation passes, send the registration data to your backend API
    // ... (API call logic)

    // Handle success or error response from backend
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
      <TextInput
        style={styles.input}
        placeholder="Birth Date"
        value={state.birthDate.toDateString()}
        editable={false}
      />
      {state.image && (
        <Image source={{ uri: state.image }} style={styles.image} />
      )}
      <TouchableOpacity onPress={handleImageUpload} style={styles.imageUploadButton}>
        <Text style={styles.imageUploadText}>Upload Image (Optional)</Text>
      </TouchableOpacity>
      <DateTimePicker
        value={state.birthDate}
        onChange={handleDateChange}
        mode="date"
      />
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
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  imageUploadButton: {
    alignSelf: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  imageUploadText: {
    color: '#007bff',
  },
});

export default RegistrationForm;
