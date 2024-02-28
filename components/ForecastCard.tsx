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
  console.log(dayForecast);

  const navigation = useNavigation<navigationProp>();

  const handleNavigate = () => {
    navigation.navigate('Forecast', {
      data: dayForecast,
    });
  };
  //TODO: choose which of time of the day to display for the data

  return (
    <TouchableWithoutFeedback onPress={handleNavigate}>
      <View style={styles.container}>
        <Text style={styles.weekDayText}>hi</Text>

        <Text style={styles.tempText}> °C</Text>
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
