import { StyleSheet, Text, View } from 'react-native';

import DescriptionProps from './WeatherDetails';
import WeatherDataMainProps from './WeatherDetails';

type ForecastWeatherDataDetails = {
  dt: number;
  main: typeof WeatherDataMainProps;
  weather: (typeof DescriptionProps)[];
};

export type ForecastWeatherData = {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastWeatherDataDetails[];
};

export default function Forecasts({
  forecastWeatherData,
}: {
  forecastWeatherData: ForecastWeatherData;
}) {
  console.log(forecastWeatherData);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Forecasts</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
    color: '#fff',
  },
});
