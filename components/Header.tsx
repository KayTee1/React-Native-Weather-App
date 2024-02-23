import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { getFormattedTime } from '../util/getTime';
import WeatherIcon from './WeatherIcon';

type HeaderProps = {
  iconCode: string;
};

export default function Header({ iconCode }: HeaderProps) {
  const formattedDate = getFormattedTime();
  return (
    <View style={styles.header}>
      <WeatherIcon iconCode={iconCode} size="lg"/>
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
