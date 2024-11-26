// src/components/GlobalLoading.tsx
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useLoading } from '../contexts/LoadingContext';

const GlobalLoading: React.FC = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default GlobalLoading;
