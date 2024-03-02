import { useEffect, useState } from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import { WeatherData } from "../types/Types";
import { getWeekDay } from "../util/getTime";

import WeatherIcon from "./WeatherIcon";

type DayForecasts = {
  date: string;
  forecasts: WeatherData[];
};

type RootStackParamList = {
  Forecast: {
    data: DayForecasts;
  };
};

type displayDataProps = {
  weekDay: string;
  averageTemp: number;
  weatherIcon: string;
};

type navigationProp = StackNavigationProp<RootStackParamList, "Forecast">;

export default function ForecastCard({
  dayForecast,
}: {
  dayForecast: DayForecasts;
}) {
  const navigation = useNavigation<navigationProp>();

  const handleNavigate = () => {
    navigation.navigate("Forecast", {
      data: dayForecast,
    });
  };
  const [displayedData, setDisplayedData] = useState<displayDataProps>({
    weekDay: "",
    averageTemp: 0,
    weatherIcon: "",
  });

  useEffect(() => {
    const length = dayForecast.forecasts.length;
    // Calculate average temperature for the day
    const avgTemp =
      dayForecast.forecasts.reduce(
        (acc, forecast) => acc + forecast.main.temp,
        0
      ) / length;
    // randomIndex is used to get a random icon for the day
    const randomIndex = Math.floor(Math.random() * length);
    setDisplayedData({
      weekDay: getWeekDay(dayForecast.forecasts[randomIndex].dt),
      averageTemp: avgTemp,
      weatherIcon: dayForecast.forecasts[randomIndex].weather[0].icon,
    });
  }, [dayForecast]);

  return (
    <Pressable onPress={handleNavigate} style={styles.container}>
      <Text style={styles.weekDayText}>{displayedData.weekDay}</Text>
      <WeatherIcon iconCode={displayedData.weatherIcon} size="sm" />
      <Text style={styles.tempText}>
        {displayedData.averageTemp.toFixed(0)} °C
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    height: 150,
    maxHeight: 150,
    width: 100,
    margin: 8,
    alignItems: "center",
  },
  weekDayText: {
    fontSize: 20,
    color: "#fff",
    marginTop: 10,
    marginBottom: 15,
  },
  tempText: {
    fontSize: 18,
    color: "#fff",
    marginTop: 10,
    marginBottom: 15,
  },
});
