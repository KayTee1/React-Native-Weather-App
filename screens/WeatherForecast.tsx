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
import { getData } from "../util/storage";
import { useNavigation } from "@react-navigation/native";

export default function WeatherForecast() {
  //state for location input
  const [text, onChangeText] = useState<string>("");

  const [currentWeatherData, setCurrentWeatherData] =
    useState<WeatherData | null>(null);
  const [forecastWeatherData, setForecastWeatherData] =
    useState<ForecastWeatherDataProps>({} as ForecastWeatherDataProps);

  const navigation = useNavigation();

  const fetchData = async (option?: string) => {
    let cityLocation = text;
    const defaultLocation = await getData("defaultLocation");
    if (defaultLocation) {
      cityLocation = defaultLocation;
    }
    if (option === "gps") {
      const city: string | null = await getCurrentLocation();
      if (city) {
        cityLocation = city;
      } else {
        showToast({
          type: "error",
          message: [
            "Error",
            "There was an error fetching your current location",
          ],
        });
      }
    }

    try {
      const currentResult = await fetchWeatherData("current", cityLocation);
      if ("weatherData" in currentResult && currentResult.weatherData) {
        setCurrentWeatherData(currentResult.weatherData);
      }

      const forecastResult = await fetchWeatherData("forecast", cityLocation);
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
    const unsubscribe = navigation.addListener("focus", () => {
      // Call fetchData when the screen comes into focus
      fetchData();
    });
    return unsubscribe;
  }, []);

  if (!currentWeatherData) {
    showToast({
      type: "error",
      message: ["Error", "There was an error fetching data"],
    });

    return null;
  }

  const { main, weather, name, dt } = currentWeatherData;
  forecastWeatherData.name = name;
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["black", "transparent"]}
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
