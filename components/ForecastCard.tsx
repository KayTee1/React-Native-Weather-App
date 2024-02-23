import { StyleSheet, Text, View, Platform } from 'react-native';
import { DescriptionProps } from '../screens/WeatherForecast';
import { getWeekDay } from '../util/getTime';
import WeatherIcon from './WeatherIcon';

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
  console.log(forecastListItem);
  const { dt } = forecastListItem;
  const { temp, feels_like } = forecastListItem.main;
  return (
    <View style={styles.container}>
      <Text style={styles.weekDayText}>{getWeekDay(dt)}</Text>
      <WeatherIcon
        iconCode={forecastListItem.weather[0].icon}
        size="sm"
      />
      <Text style={styles.tempText}>{feels_like.toFixed(1)} °C</Text>
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
    alignItems: 'center',
  },
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
