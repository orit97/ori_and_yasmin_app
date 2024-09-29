import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useUser } from '../contexts/UserContext';
import { postData } from '../api';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RegistrationForm: React.FC = () => {
  const { login } = useUser();
  const [loading, setLoading] = useState(false); // Add loading state
  const [showDatePicker, setShowDatePicker] = useState(false); // Control date picker visibility

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 'Password must include an uppercase letter, number, and special character')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
      .required('Phone number is required'),
    birthDate: Yup.date()
      .required('Birth Date is required')
      .test('age', 'You must be at least 15 years old', function (value) {
        const age = calculateAge(new Date(value));
        return age >= 15;
      }),
    address: Yup.object().shape({
      street: Yup.string().required('Street is required'),
      city: Yup.string().required('City is required'),
      homeNumber: Yup.number().required('Home number is required').positive().integer(),
    }),
  });

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age -= 1;
    }
    return age;
  };

  const handleRegister = async (values: any, { resetForm }: any) => {
    setLoading(true);
    try {
      login({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        birthDate: values.birthDate,
        address: values.address,
        role: ''
      });

      const response = await postData('/register', values);
      Alert.alert('Success', `User registered`);
      resetForm();
    } catch (error) {
      Alert.alert('Error', 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        birthDate: new Date(),
        address: {
          street: '',
          city: '',
          homeNumber: 0,
        },
      }}
      validationSchema={validationSchema}
      onSubmit={handleRegister}
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.header}>Registration</Text>

          {/* First Name */}
          <TextInput
            style={[styles.input, touched.firstName && errors.firstName ? styles.errorInput : null]}
            placeholder="First Name"
            onChangeText={handleChange('firstName')}
            onBlur={handleBlur('firstName')}
            value={values.firstName}
          />
          <ErrorMessage name="firstName" component={Text} style={styles.errorText} />

          {/* Last Name */}
          <TextInput
            style={[styles.input, touched.lastName && errors.lastName ? styles.errorInput : null]}
            placeholder="Last Name"
            onChangeText={handleChange('lastName')}
            onBlur={handleBlur('lastName')}
            value={values.lastName}
          />
          <ErrorMessage name="lastName" component={Text} style={styles.errorText} />

          {/* Email */}
          <TextInput
            style={[styles.input, touched.email && errors.email ? styles.errorInput : null]}
            placeholder="Email"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          <ErrorMessage name="email" component={Text} style={styles.errorText} />

          {/* Phone */}
          <TextInput
            style={[styles.input, touched.phone && errors.phone ? styles.errorInput : null]}
            placeholder="Phone"
            onChangeText={handleChange('phone')}
            onBlur={handleBlur('phone')}
            value={values.phone}
          />
          <ErrorMessage name="phone" component={Text} style={styles.errorText} />

          {/* Date Picker */}
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
            <Text>{values.birthDate ? values.birthDate.toDateString() : 'Select Birth Date'}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={values.birthDate || new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event: any, selectedDate?: Date) => {
                setShowDatePicker(false); // Ensure picker closes after date selection
                setFieldValue('birthDate', selectedDate || values.birthDate);
              }}
            />
          )}
          <ErrorMessage name="birthDate" component={Text} style={styles.errorText} />

          {/* Password */}
          <TextInput
            style={[styles.input, touched.password && errors.password ? styles.errorInput : null]}
            placeholder="Password"
            secureTextEntry
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          />
          <ErrorMessage name="password" component={Text} style={styles.errorText} />

          {/* Confirm Password */}
          <TextInput
            style={[styles.input, touched.confirmPassword && errors.confirmPassword ? styles.errorInput : null]}
            placeholder="Confirm Password"
            secureTextEntry
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            value={values.confirmPassword}
          />
          <ErrorMessage name="confirmPassword" component={Text} style={styles.errorText} />

          {/* Address: Street */}
          <TextInput
            style={[styles.input, touched.street && errors.address?.street ? styles.errorInput : null]}
            placeholder="Street Address"
            onChangeText={handleChange('address.street')}
            onBlur={handleBlur('address.street')}
            value={values.address.street}
          />
          <ErrorMessage name="address.street" component={Text} style={styles.errorText} />

          {/* Address: City */}
          <TextInput
            style={[styles.input, touched.city && errors.address?.city ? styles.errorInput : null]}
            placeholder="City"
            onChangeText={handleChange('address.city')}
            onBlur={handleBlur('address.city')}
            value={values.address.city}
          />
          <ErrorMessage name="address.city" component={Text} style={styles.errorText} />

          {/* Address: Home Number */}
          <TextInput
            style={[styles.input, touched.homeNumber && errors.address?.homeNumber ? styles.errorInput : null]}
            placeholder="Home Number"
            keyboardType="numeric"
            onChangeText={handleChange('address.homeNumber')}
            onBlur={handleBlur('address.homeNumber')}
            value={values.address.homeNumber.toString()}
          />
          <ErrorMessage name="address.homeNumber" component={Text} style={styles.errorText} />

          {/* Submit Button */}
          <Button title={loading ? 'Registering...' : 'Register'} onPress={handleSubmit} disabled={loading} />
        </ScrollView>
      )}
    </Formik>
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
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default RegistrationForm;
