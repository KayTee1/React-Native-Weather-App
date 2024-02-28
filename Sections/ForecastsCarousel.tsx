import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { getRawDate } from '../util/getTime';

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

export default function ForecastsCarousel({
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

  //TODO Instead of only passing every 8th forecast pass all but display only 1
  // 1 combined? average? or just the 12:00 forecast

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
