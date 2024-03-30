import { Image, StyleSheet } from "react-native";

type WeatherIconProps = {
  iconCode: string;
  size: "sm" | "lg";
};

export default function WeatherIcon({ iconCode, size }: WeatherIconProps) {
  const uri = `http://openweathermap.org/img/wn/${iconCode}.png`;
  return (
    <Image
      style={size === "sm" ? styles.icon_sm : styles.icon_lg}
      source={{
        uri: uri,
      }}
    />
  );
}

const styles = StyleSheet.create({
  icon_lg: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  icon_sm: {
    width: 40,
    height: 40,
  },
});
