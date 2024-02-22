import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import getWeatherData from '../util/getWeatherData';

import Header from '../components/Header';
import WeatherDetails from '../components/WeatherDetails';
import Forecasts from '../components/Forecasts';
type DescriptionProps = {
  id: number;
  main: string;
  description: string;
  icon: string;
};
type WeatherData = {
  main: any;
  weather: DescriptionProps[];
  name: string;
};

const WeatherForecast = () => {
  const [currentWeatherData, setCurrentWeatherData] =
    useState<WeatherData | null>(null);
  const [forecastWeatherData, setForecastWeatherData] =
    useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentData = await getWeatherData('current');
        const forecastData = await getWeatherData('forecast');
        setCurrentWeatherData(currentData);
        setForecastWeatherData(forecastData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
      }
    };

    fetchData();
  }, []);

  if (!currentWeatherData) {
    return null;
  }

  const { main, weather, name } = currentWeatherData;
  const icon = weather[0].icon;
  return (
    <View style={styles.container}>
      <Header uri={`https://openweathermap.org/img/wn/${icon}.png`} />
      <WeatherDetails
        weather={weather}
        details={main}
        name={name}
      />
      <Forecasts forecastWeatherData={forecastWeatherData} />
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
