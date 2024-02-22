import { Text, View } from 'react-native';

type ForecastWeatherData = {};

export default function Forecasts({ forecastWeatherData }) {
  console.log(forecastWeatherData);
  return (
    <View>
      <Text>Forecasts</Text>
    </View>
  );
}
