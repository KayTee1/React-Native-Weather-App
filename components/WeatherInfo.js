import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function WeatherInfo({
  weatherStatus,
  weatherIcon,
  temperature,
  windSpeed,
}) {
  return (
    <View style={styles.container}>
      <Text>{weatherStatus}</Text>
      <Image
        style={styles.image}
        source={{ uri: `https://openweathermap.org/img/wn/${weatherIcon}.png` }}
      />
      <Text>{temperature}</Text>
      <Text>{windSpeed}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
});
