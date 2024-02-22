import { StyleSheet, Text, View } from 'react-native';
type DescriptionProps = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type DetailsProps = {
  temp: number;
  feels_like: number;
};

type WeatherDetailsProps = {
  weather: DescriptionProps[];
  details: DetailsProps;
  name: string;
};

export default function WeatherDetails({
  weather,
  details,
  name,
}: WeatherDetailsProps) {
  const { main } = weather[0];
  const { temp, feels_like } = details;
  return (
    <View style={styles.main_container}>
      <View style={styles.temp_container}>
        <Text style={styles.temperature}>{temp.toFixed(1)} </Text>
        <Text style={styles.degree}>°C</Text>
      </View>
      <Text style={styles.location}>{name}</Text>
      <View style={styles.description}>
        <Text style={styles.text}>Feels like {feels_like.toFixed(1)}</Text>
        <Text style={styles.ball_char}> ⬤ </Text>
        <Text style={styles.text}>{main}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  ball_char: {
    fontSize: 10,
    color: '#fff',
    marginTop: 5,
    marginRight: 5,
    marginLeft: 5,
  },
  description: {
    flexDirection: 'row',
  },
  main_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  location: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 15,
  },
  temp_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  degree: {
    fontSize: 32,
    color: '#fff',
    marginBottom: 15,
  },
  temperature: {
    fontSize: 50,
    color: '#fff',
  },
  text: {
    fontSize: 18,
    color: '#fff',
  },
});
