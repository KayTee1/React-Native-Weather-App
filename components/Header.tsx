import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { getFormattedTime } from '../util/getTime';
import WeatherIcon from './WeatherIcon';
import { DescriptionProps } from '../screens/WeatherForecast';

type HeaderProps = {
  weather: DescriptionProps[];
};

export default function Header({ weather }: HeaderProps) {
  // TODO: Get the current time and format it from screen
  // make this reuseable by passing more stuff in
  const formattedDate = getFormattedTime();

  const { icon } = weather[0];
  return (
    <View style={styles.header}>
      <WeatherIcon
        iconCode={icon}
        size="lg"
      />
      <View>
        <Text style={styles.text}>Today</Text>
        <Text style={styles.time}>{formattedDate}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 34,
    color: '#fff',
  },
  time: {
    fontSize: 15,
    color: '#fff',
  },
});
