import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Button, Linking } from "react-native";
import { APIKEY } from "../secrets.js";
import Header from "../components/Header.js";
import WeatherInfo from "../components/WeatherInfo.js";
import LocationInput from "../components/LocationInput.js";

const CurrentWeatherScreen = ({ navigation }) => {
  const [inputLocation, onChangeLocation] = useState("Tampere");
  const [weatherData, setWeatherData] = useState({});
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const key = APIKEY;
      const location = inputLocation;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=metric`;
      const res = await fetch(url);
      const data = await res.json();

      setWeatherData(data);
      setIsError(false);
    } catch (err) {
      setIsError(true);
      console.error(err);
    }
  }, [inputLocation]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const temperature = weatherData.main?.temp + " c";
  const windSpeed = weatherData.wind?.speed + " m/s";
  const weatherStatus =
    weatherData.weather && weatherData.weather.length
      ? weatherData.weather[0].main
      : undefined;
  const weatherIcon =
    weatherData.weather && weatherData.weather.length
      ? weatherData.weather[0].icon
      : undefined;

  const weatherLocation = weatherData.name;

  const openForecastScreen = () => {
    navigation.navigate("Weather forecast");
  };

  const openMaps = () => {
    const lat = 67.23;
    const lon = 23.4;
    const url = `geo:${lat},${lon}`;
    Linking.openURL(url);
  };
  const openForeca = () => {
    const url = `https://www.foreca.fi/Finland/Tampere`;
    Linking.openURL(url);
  };
  return (
    <View style={styles.container}>
      {isError ? (
        <Text>Something went wrong!</Text>
      ) : (
        <>
          <Header location={weatherLocation} />
          <WeatherInfo
            weatherStatus={weatherStatus}
            weatherIcon={weatherIcon}
            temperature={temperature}
            windSpeed={windSpeed}
          />
          <LocationInput onChangeLocation={onChangeLocation} />
          <Button title="Forecast" onPress={openForecastScreen}></Button>
          <Button title="Open Maps" onPress={openMaps}></Button>
          <Button title="Open Foreca" onPress={openForeca}></Button>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CurrentWeatherScreen;
