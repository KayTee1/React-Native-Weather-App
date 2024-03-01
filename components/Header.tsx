import { StyleSheet, Text, View } from 'react-native';

import { DescriptionProps } from '../screens/WeatherForecast';
import { getFormattedTime } from '../util/getTime';
import WeatherIcon from './WeatherIcon';

type HeaderProps = {
  weather: DescriptionProps[];
  dt: number;
};

export default function Header({ weather, dt }: HeaderProps) {
  const formattedDate = getFormattedTime(dt);

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
