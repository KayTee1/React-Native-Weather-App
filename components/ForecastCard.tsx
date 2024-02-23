import { StyleSheet, Text, View } from 'react-native';
import { DescriptionProps } from '../screens/WeatherForecast';
import { getWeekDay } from '../util/getTime';

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
  const { dt } = forecastListItem;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{getWeekDay(dt)}</Text>
    </View>
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
  },
  text: {
    fontSize: 20,
    color: '#fff',
  },
});
