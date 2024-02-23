import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ForecastCard from './ForecastCard';
import { getRawDate } from '../util/getTime';

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
  const [forecastData, setForecastData] = useState<
    ForecastWeatherDataDetails[]
  >([]);

  useEffect(() => {
    if (!forecastWeatherData.list.length) return;

    const filteredData = forecastWeatherData.list.filter((forecastListItem) =>
      forecastListItem.dt_txt.includes('12:00:00')
    );

    if (!filteredData[0].dt_txt.includes(getRawDate())) {
      const todayForecastIndex = forecastWeatherData.list.findIndex(
        (forecastListItem) => forecastListItem.dt_txt.includes(getRawDate())
      );

      if (todayForecastIndex !== -1) {
        filteredData.unshift(forecastWeatherData.list[todayForecastIndex]);
      }
    }

    setForecastData(filteredData);
  }, [forecastWeatherData]);

  return (
    <View style={styles.container}>
      {forecastData.map((forecastListItem) => (
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
    padding: 15,
    marginTop: 50,
    flex: 1,
    flexDirection: 'row',
    overflow: 'scroll',
    maxWidth: '100%',
  },
});
