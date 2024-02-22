import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import getWeatherData from '../util/getWeatherData';
import Header from '../components/Header';

const WeatherForecast = ({ navigation }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWeatherData();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, []);

  if (!weatherData) {
    return null;
  }

  const { main, weather, wind, dt } = weatherData;

  return (
    <View style={styles.container}>
      <Header
        uri={`https://openweathermap.org/img/wn/${weather[0].icon}.png`}
        date={dt}
      />

      <WeatherDetails />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222441',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default WeatherForecast;
