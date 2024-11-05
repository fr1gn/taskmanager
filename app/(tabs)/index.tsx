import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import App from '../../App';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <App />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
