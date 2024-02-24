import { useNavigation } from '@react-navigation/native';
import { Button, StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';

export default function ForecastDetails() {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.text}>Forecast Details</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    borderRadius: 10,
  },
  text: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
