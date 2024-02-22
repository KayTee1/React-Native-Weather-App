import React, { useState, useCallback, useEffect } from 'react';
import { APIKEY } from '../secrets';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Linking,
  FlatList,
} from 'react-native';

const WeatherForecastScreen = ({ navigation }) => {
  const [isError, setIsError] = useState(false);
  const [weatherData, setWeatherData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const key = APIKEY;
      const location = 'tampere';
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${key}&units=metric&cnt=20`;
      const res = await fetch(url);
      const data = await res.json();
      setWeatherData(data.list);
      setIsError(false);
    } catch (err) {
      setIsError(true);
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  console.log(weatherData);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.dt_txt}</Text>
      <Text>{item.weather[0].main}</Text>
      <Text>{item.main.temp} c</Text>
      <Text>{item.wind.speed} m/s</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {isError ? (
        <Text>Something went wrong!</Text>
      ) : (
        <FlatList
          data={weatherData}
          renderItem={renderItem}
          keyExtractor={(item) => item.dt.toString()}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
  },
});

export default WeatherForecastScreen;
