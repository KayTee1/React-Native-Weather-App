import { StyleSheet, Text, View } from 'react-native';

import DescriptionProps from './WeatherDetails';
import WeatherDataMainProps from './WeatherDetails';
import ForecastCard from './ForecastCard';

type ForecastWeatherDataDetails = {
  main: typeof WeatherDataMainProps;
  weather: (typeof DescriptionProps)[];
  dt: number;
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
  console.log(forecastWeatherData)
  return (
    <View style={styles.container}>
      {forecastWeatherData.list.map((forecastListItem) => (
        <ForecastCard key={forecastListItem.dt} forecastListItem={forecastListItem} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    flexDirection: 'row',
    overflow: 'scroll',
    maxWidth: '100%',
  },
  text: {
    fontSize: 20,
    color: '#fff',
  },
});
