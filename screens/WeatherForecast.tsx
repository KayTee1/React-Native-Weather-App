import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import {
  DescriptionProps,
  WeatherData,
  WeatherDataMainProps,
} from '../types/Types';
import getWeatherData from '../util/getWeatherData';

import WeatherDetails from '../Sections/WeatherDetails';

import ForecastCarousel, {
  ForecastWeatherDataProps,
} from '../Sections/ForecastsCarousel';

import Header from '../components/Header';
import LocationInput from '../components/LocationInput';

const WeatherForecast = () => {
  //state for location input
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
    <SafeAreaView style={styles.container}>
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
        <View style={{ alignSelf: 'flex-end', marginRight: 40, marginTop: 20 }}>
          <LocationInput
            text={text}
            onChangeText={onChangeText}
            fetchData={fetchData}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
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
    maxWidth: '100%',
  },
});

export default WeatherForecast;
