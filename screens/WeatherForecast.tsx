import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import getWeatherData from '../util/getWeatherData';

import Header from '../components/Header';
import WeatherDetails from '../Sections/WeatherDetails';
import ForecastCarousel, {
  ForecastWeatherDataProps,
} from '../Sections/ForecastsCarousel';
import LocationInput from '../components/LocationInput';
import { LinearGradient } from 'expo-linear-gradient';

export type DescriptionProps = {
  id: number;
  main: string;
  description: string;
  icon: string;
};
type WeatherDataMainProps = {
  temp: number;
  feels_like: number;
};
type WeatherData = {
  main: WeatherDataMainProps;
  weather: DescriptionProps[];
  name: string;
  dt: number;
};

const WeatherForecast = () => {
  //state for input
  const [text, onChangeText] = useState<string>('');

  const [currentWeatherData, setCurrentWeatherData] =
    useState<WeatherData | null>(null);
  const [forecastWeatherData, setForecastWeatherData] =
    useState<ForecastWeatherDataProps>({} as ForecastWeatherDataProps);

  const fetchData = async () => {
    onChangeText('');
    try {
      const currentData = await getWeatherData('current', text);
      const forecastData = await getWeatherData('forecast', text);
      setCurrentWeatherData(currentData);
      setForecastWeatherData(forecastData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (!currentWeatherData) {
    return null;
  }

  const { main, weather, name, dt } = currentWeatherData;

  return (
    <LinearGradient
      colors={['rgba(0,0,0,0.8)', 'transparent']}
      style={styles.container}>
      <Header
        weather={weather}
        dt={dt}
      />
      <WeatherDetails
        weather={weather}
        main={main}
        name={name}
      />
      <ForecastCarousel forecastWeatherData={forecastWeatherData} />
      <View style={{ }}>
        <LocationInput
          text={text}
          onChangeText={onChangeText}
          fetchData={fetchData}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222441',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});

export default WeatherForecast;
