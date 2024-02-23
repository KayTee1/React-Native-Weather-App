import { StyleSheet, Text, View } from 'react-native';

import DescriptionProps from './WeatherDetails';
import WeatherDataMainProps from './WeatherDetails';
import ForecastCard from './ForecastCard';
import { useState } from 'react';

type WeatherDataMainProps = {
  temp: number;
  feels_like: number;
};
type DescriptionProps = {
  id: number;
  main: string;
  description: string;
  icon: string;
};
type ForecastWeatherDataDetails = {
  main: WeatherDataMainProps;
  weather: DescriptionProps[];
  dt: number;
  dt_txt: string;
};

export type ForecastWeatherDataProps = {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastWeatherDataDetails[];
};

export default function Forecasts({
  forecastWeatherData,
}: {
  forecastWeatherData: ForecastWeatherDataProps;
}) {
  console.log(forecastWeatherData.list);
  const [forecastData, setForecastData] = useState([]); // state for 4 days of forecast data
  /*
  forecastWeatherData.list.forEach(element => {
    console.log(element.dt_txt);


    //setForecastData([...forecastData, element]);
  });
  */
  forecastWeatherData.list.map((forecastListItem) => {
    //console.log(forecastListItem.dt_txt);
    const uniqueDates = forecastListItem.dt_txt.split(' ')[0];
    console.log(uniqueDates);
  });

  return (
    <View style={styles.container}>
      {forecastWeatherData.list.map((forecastListItem) => (
        <ForecastCard
          key={forecastListItem.dt}
          forecastListItem={forecastListItem}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    flexDirection: 'row',
    overflow: 'scroll',
    maxWidth: '100%',
  },
  text: {
    fontSize: 20,
    color: '#fff',
  },
});
