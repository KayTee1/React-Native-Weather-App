import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { getRawDate, getToday } from '../util/getTime';

import ForecastCard from '../components/ForecastCard';

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
  snow?: number;
  rain?: number;
};

export type ForecastWeatherDataProps = {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastWeatherDataDetails[];
};
export type DayForecasts = {
  date: string;
  forecasts: ForecastWeatherDataDetails[];
};

export default function ForecastsCarousel({
  forecastWeatherData,
}: {
  forecastWeatherData: ForecastWeatherDataProps;
}) {
  const [forecastData, setForecastData] = useState<DayForecasts[]>([]);

  useEffect(() => {
    if (!forecastWeatherData.list.length) return;

    const forecastsByDate: { [key: string]: ForecastWeatherDataDetails[] } = {};

    forecastWeatherData.list.forEach((forecastListItem) => {
      const date = forecastListItem.dt_txt.split(' ')[0];
      if (!forecastsByDate[date]) {
        forecastsByDate[date] = [];
      }
      forecastsByDate[date].push(forecastListItem);
    });

    const dayGroups: DayForecasts[] = Object.entries(forecastsByDate).map(([date, forecasts]) => ({
      date,
      forecasts
    }));

    setForecastData(dayGroups);
  }, [forecastWeatherData]);

  return (
    <View style={styles.container}>
      {forecastData.map((dayForecast, index) => (
        <ForecastCard
          key={index}
          dayForecast={dayForecast}
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
