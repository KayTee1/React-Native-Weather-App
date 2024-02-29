import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import RenderItem from '../components/RenderItem';
import { getFormattedTime } from '../util/getTime';
export default function ForecastDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { data }: any = route.params;
  //for testing purposes
  /*
  const data = [
    {
      dt: 1631781600,
      main: {
        temp: 11.1,
        feels_like: 10.1,
        temp_min: 11.1,
        temp_max: 11.1,
        pressure: 1014,
        sea_level: 1014,
        grnd_level: 1008,
        humidity: 67,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        },
      ],
      wind: {
        speed: 2.39,
        deg: 272,
        gust: 2.73,
      },
    },
  ];
*/
  return (
    <LinearGradient
      colors={['rgba(0,0,0,0.8)', 'transparent']}
      style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Tampere, </Text>
        <Text style={styles.text}>
          {getFormattedTime(data.forecasts[0].dt)}
        </Text>
      </View>

      <View style={styles.forecastsContainer}>
        {data.forecasts.map((forecast: any, index: number) => (
          <RenderItem
            key={index}
            forecast={forecast}
          />
        ))}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go back</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222441',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    minWidth: 300,
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  forecastsContainer: {
    flexDirection: 'column',
    maxHeight: 500,
    overflow: 'scroll',
  },
  text: {
    color: 'black',
    fontSize: 20,
  },
  button: {
    marginBottom: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    minWidth: 300,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
  },
});
