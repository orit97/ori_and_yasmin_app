import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement login logic here (e.g., authenticate with a server)
    console.log('Logging in...', email, password);
    // If successful, navigate to a different screen
    // navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome back!</Text>
      <Text style={styles.subTitle}>Log in to your account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true} // Hide password characters
      />
      <Button title="Login" onPress={handleLogin} style={styles.loginButton} />
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0', // Light gray background
  },
  welcomeText: {
    fontSize: 30,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',

  },
  subTitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#666',
  },
  input: {
    height: 40, // Set a fixed height for both inputs
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: '#007bff', // Blue button
    padding: 15, // Increase button padding for better look
    borderRadius: 5,
    marginTop: 20,

  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 20, // Add space above register section
  },
  registerText: {
    fontSize: 16,
    color: '#666',
  },
  registerLink: {
    fontSize: 16,
    color: '#007bff', // Blue link color
    fontWeight: 'bold',
    marginLeft: 5, // Add spacing between text and link
  },
});

export default LoginPage;