import { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { WeatherData } from "../types/Types";
import Toast from "react-native-toast-message";

import { fetchWeatherData } from "../util/getWeatherData";
import { getCurrentLocation } from "../util/getLocation";
import { showToast } from "../util/showToast";

import WeatherDetails from "../Sections/WeatherDetails";
import ForecastCarousel, {
  ForecastWeatherDataProps,
} from "../Sections/ForecastsCarousel";

import Header from "../components/Header";
import LocationInput from "../components/LocationInput";

export default function WeatherForecast() {
  //state for location input
  const [text, onChangeText] = useState<string>("");

  const [currentWeatherData, setCurrentWeatherData] =
    useState<WeatherData | null>(null);
  const [forecastWeatherData, setForecastWeatherData] =
    useState<ForecastWeatherDataProps>({} as ForecastWeatherDataProps);

  const fetchData = async (option?: string) => {
    if (option === "gps") {
      const city: string | null = await getCurrentLocation();
      if (city) {
        onChangeText(city);
      }
    }

    try {
      const currentResult = await fetchWeatherData("current", text);
      if ("weatherData" in currentResult && currentResult.weatherData) {
        setCurrentWeatherData(currentResult.weatherData);
      }

      const forecastResult = await fetchWeatherData("forecast", text);
      if ("forecastData" in forecastResult && forecastResult.forecastData) {
        setForecastWeatherData(forecastResult.forecastData);
      }
    } catch (error) {
      showToast({
        type: "error",
        message: ["Error", "There was an error fetching the weather data"],
      });
    }

    onChangeText("");
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (!currentWeatherData) {
    showToast({
      type: "error",
      message: ["Error", "There was an error fetching data"],
    });

    return null;
  }

  const { main, weather, name, dt } = currentWeatherData;

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["rgba(0,0,0,0.8)", "transparent"]}
        style={styles.container}
      >
        <Header weather={weather} dt={dt} />
        <WeatherDetails weather={weather} main={main} name={name} />
        <ForecastCarousel forecastWeatherData={forecastWeatherData} />
        <View style={{ alignSelf: "flex-end", marginRight: 40, marginTop: 20 }}>
          <LocationInput
            text={text}
            onChangeText={onChangeText}
            fetchData={fetchData}
          />
        </View>
        <Toast />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222441",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    maxWidth: "100%",
  },
});
