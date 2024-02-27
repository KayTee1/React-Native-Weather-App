import { StyleSheet, Text, View } from 'react-native';
import { ForecastWeatherDataProps } from './ForecastsCarousel';
import { useEffect, useState } from 'react';
import PrecipitationBar from '../components/PercipitationBar';

export default function PrecipitationSection({
  forecastWeatherData,
}: {
  forecastWeatherData: ForecastWeatherDataProps;
}) {
  const [precipitationData, setPrecipitationData] = useState([] as any);

  useEffect(() => {
    forecastWeatherData.list.slice(0, 8).forEach((forecastListItem) => {

      setPrecipitationData([...precipitationData]);
    });
  }, [forecastWeatherData]);

  return (
    <View style={styles.container}>
      {precipitationData.map((precipitation, index) => (
        <PrecipitationBar key={index} precipitation={precipitation} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222441',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});
