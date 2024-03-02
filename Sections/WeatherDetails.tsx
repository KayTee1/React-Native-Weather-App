import { StyleSheet, Text, View } from "react-native";
import { DescriptionProps, WeatherDataMainProps } from "../types/Types";
import { showToast } from "../util/showToast";

type WeatherDetailsProps = {
  weather: DescriptionProps[];
  main: WeatherDataMainProps;
  name: string;
};

export default function WeatherDetails({
  weather,
  main,
  name,
}: WeatherDetailsProps) {
  if (!weather || !main) {
    showToast({
      type: "error",
      message: ["Error", "There was an error fetching data"],
    });
    return;
  }
  const { temp, feels_like } = main;
  return (
    <View style={styles.main_container}>
      <View style={styles.temp_container}>
        <Text style={styles.temperature}>{temp.toFixed(0)} </Text>
        <Text style={styles.degree}>°C</Text>
      </View>
      <Text style={styles.location}>{name}</Text>
      <View style={styles.description}>
        <Text style={styles.text}>Feels like {feels_like.toFixed(0)}</Text>
        <Text style={styles.ball_char}> ⬤ </Text>
        <Text style={styles.text}>{weather[0].main}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  ball_char: {
    fontSize: 10,
    color: "#fff",
    marginTop: 5,
    marginRight: 5,
    marginLeft: 5,
  },
  description: {
    flexDirection: "row",
  },
  main_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  location: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 15,
  },
  temp_container: {
    flexDirection: "row",
    alignItems: "center",
  },
  degree: {
    fontSize: 32,
    color: "#fff",
    marginBottom: 15,
  },
  temperature: {
    fontSize: 50,
    color: "#fff",
  },
  text: {
    fontSize: 18,
    color: "#fff",
  },
});
