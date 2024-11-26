// src/pages/LoginScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useUser } from '../contexts/UserContext';
import { useLoading } from '../contexts/LoadingContext';
import { postData } from '../api';
import { useNavigation } from '@react-navigation/native';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { loading, setLoading } = useLoading(); // Global loading state
  const { user, login } = useUser();
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true); 
    try {
      const userData = await postData('/login', { email, password });
      console.log('UserData fetched from server:', userData); // Debugging log
      login(userData.user);
    } catch (error) {
      handleLoginError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigateAfterLogin(user.role);
      console.log('User updated:', user);
    }
  }, [user]);

  const navigateAfterLogin = (role: string) => {
    if (role === 'admin') {
      Alert.alert('Success', 'Welcome Admin');
      navigation.navigate('Admin');
    } else {
      Alert.alert('Success', 'Welcome to your profile');
      navigation.navigate('Profile');
    }
  };

  const handleLoginError = (error: any) => {
    console.error('Login error:', error);
    Alert.alert('Error', 'Invalid email or password.');
  };

  const goToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}

      <TouchableOpacity onPress={goToRegister}>
        <Text style={styles.registerText}>Don't have an account? Register here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f7f7f7',
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  registerText: {
    marginTop: 20,
    color: 'blue',
    textAlign: 'center',
  },
});

export default LoginScreen;
