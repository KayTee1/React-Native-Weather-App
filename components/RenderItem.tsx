import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { ForecastWeatherDataDetails } from '../Sections/ForecastsCarousel';
import WeatherIcon from './WeatherIcon';

type RenderItemProps = {
  forecast: ForecastWeatherDataDetails;
};

export default function RenderItem({ forecast }: RenderItemProps) {
  const { icon, description } = forecast.weather[0];
  const { temp, feels_like } = forecast.main;
  const { speed } = forecast.wind;
  return (
    <LinearGradient
      colors={['#48309D', 'transparent']}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.temp}>{temp.toFixed(1)} °</Text>
        <View style={styles.moreDetails}>
          <Text style={styles.text}>Feels like: {feels_like} °C</Text>
          <Text style={styles.text}>Wind speed {speed} m/s</Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.icon}>
          <WeatherIcon
            iconCode={icon}
            size="lg"
          />
        </View>
        <Text style={styles.description}>{capitalizeWords(description)}</Text>
      </View>
    </LinearGradient>
  );
}
export function capitalizeWords(str: string) {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgrey',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    minWidth: 300,
    minHeight: 150,
    margin: 10,
  },
  detailsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  temp: {
    fontSize: 36,
    color: 'black',
    marginBottom: 40,
    marginRight: 30,
  },
  description: {
    color: 'black',
    fontSize: 14,
    marginBottom: 15,
  },
  moreDetails: {
    flexDirection: 'column',
    fontWeight: '300',
  },
  icon: {
    marginBottom: 40,
  },
  text: {
    color: 'black',
    fontSize: 14,
  },
});
