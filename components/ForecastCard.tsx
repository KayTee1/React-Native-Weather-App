import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ViewStyle, Pressable } from 'react-native';
import { DescriptionProps } from '../screens/WeatherForecast';
import { getWeekDay } from '../util/getTime';
import WeatherIcon from './WeatherIcon';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { DayForecasts } from '../Sections/ForecastsCarousel';

type WeatherDataMainProps = {
  temp: number;
  feels_like: number;
};
type ForecastListItemProps = {
  main: WeatherDataMainProps;
  weather: DescriptionProps[];
  dt: number;
  dt_txt: string;
};
type RootStackParamList = {
  Forecast: {
    data: DayForecasts;
  };
};

type navigationProp = StackNavigationProp<RootStackParamList, 'Forecast'>;

export default function ForecastCard({
  dayForecast,
}: {
  dayForecast: DayForecasts;
}) {
  const navigation = useNavigation<navigationProp>();

  const handleNavigate = () => {
    navigation.navigate('Forecast', {
      data: dayForecast,
    });
  };
  const [displayedData, setDisplayedData] = useState({
    weekDay: '',
    averageTemp: 0,
    weatherIcon: '',
  });

  useEffect(() => {
    const length = dayForecast.forecasts.length;
    const avgTemp =
      dayForecast.forecasts.reduce(
        (acc, forecast) => acc + forecast.main.temp,
        0
      ) / length;
    const randomIndex = Math.floor(Math.random() * length);
    setDisplayedData({
      weekDay: getWeekDay(dayForecast.forecasts[randomIndex].dt),
      averageTemp: avgTemp,
      weatherIcon: dayForecast.forecasts[randomIndex].weather[0].icon,
    });
  }, [dayForecast]);

  return (
    <Pressable
      onPress={handleNavigate}
      style={styles.container}>
      <Text style={styles.weekDayText}>{displayedData.weekDay}</Text>
      <WeatherIcon
        iconCode={displayedData.weatherIcon}
        size="sm"
      />
      <Text style={styles.tempText}>
        {displayedData.averageTemp.toFixed(1)} °C
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    height: 150,
    maxHeight: 150,
    width: 100,
    margin: 8,
    alignItems: 'center',
  },
  containerHovered: {
    backgroundColor: 'red',
  } as ViewStyle,
  weekDayText: {
    fontSize: 20,
    color: '#fff',
    marginTop: 10,
    marginBottom: 15,
  },
  tempText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
    marginBottom: 15,
  },
});
