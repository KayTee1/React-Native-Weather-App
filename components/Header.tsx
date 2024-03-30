import { StyleSheet, Text, View } from "react-native";

import { getFormattedTime } from "../util/getTime";
import { DescriptionProps } from "../types/Types";

import WeatherIcon from "./WeatherIcon";

type HeaderProps = {
  weather: DescriptionProps[];
  dt: number;
};

export default function Header({ weather, dt }: HeaderProps) {
  const formattedDate = getFormattedTime(dt);
  if (!weather)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  const { icon } = weather[0];
  return (
    <View style={styles.header}>
      <WeatherIcon iconCode={icon} size="lg" />
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
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 34,
    color: "#fff",
  },
  time: {
    fontSize: 15,
    color: "#fff",
  },
});
