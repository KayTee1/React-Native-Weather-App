import { FlatList } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { WeatherData } from '../types/Types';

import ForecastCard from '../components/ForecastCard';

export type ForecastWeatherDataProps = {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherData[];
};
type DayForecasts = {
  date: string;
  forecasts: WeatherData[];
};

export default function ForecastsCarousel({
  forecastWeatherData,
}: {
  forecastWeatherData: ForecastWeatherDataProps;
}) {
  const [forecastData, setForecastData] = useState<DayForecasts[]>([]);

  useEffect(() => {
    if (
      !forecastWeatherData ||
      !forecastWeatherData.list ||
      !forecastWeatherData.list.length
    )
      return;

    const forecastsByDate: { [key: string]: WeatherData[] } = {};

    forecastWeatherData.list.forEach((forecastListItem) => {
      const date = forecastListItem.dt_txt.split(' ')[0];
      if (!forecastsByDate[date]) {
        forecastsByDate[date] = [];
      }
      forecastsByDate[date].push(forecastListItem);
    });

    const dayGroups: DayForecasts[] = Object.entries(forecastsByDate).map(
      ([date, forecasts]) => ({
        date,
        forecasts,
      })
    );

    setForecastData(dayGroups);
  }, [forecastWeatherData]);

  return (
    <View style={styles.container}>
      <FlatList
        data={forecastData}
        renderItem={({ item }) => <ForecastCard dayForecast={item} />}
        keyExtractor={(item) => item.date}
        horizontal
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flexDirection: 'row',
    overflow: 'scroll',
    maxWidth: '100%',
    maxHeight: 200,
    
  },
});
