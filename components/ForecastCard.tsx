import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import { DescriptionProps } from '../screens/WeatherForecast';
import { getWeekDay } from '../util/getTime';
import WeatherIcon from './WeatherIcon';
import { useNavigation } from '@react-navigation/native';

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

export default function ForecastCard({
  forecastListItem,
}: {
  forecastListItem: ForecastListItemProps;
}) {
  const navigation = useNavigation();

  const handleNavigate = () => {
    console.log('Mouse Enter');
    navigation.navigate('Forecast');
  };

  const { dt } = forecastListItem;
  const { temp, feels_like } = forecastListItem.main;

  return (
    <TouchableWithoutFeedback onPress={handleNavigate}>
      <View style={styles.container}>
        <Text style={styles.weekDayText}>{getWeekDay(dt)}</Text>
        <WeatherIcon
          iconCode={forecastListItem.weather[0].icon}
          size="sm"
        />
        <Text style={styles.tempText}>{feels_like.toFixed(1)} °C</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    height: 150,
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
