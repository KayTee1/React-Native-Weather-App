import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import Header from '../components/Header';
export default function ForecastDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { data } = route.params;
  console.log(data);
  return (
    <View style={styles.container}>
      {/*reusing the header component with others aswell*/}
      <Header iconCode={data.weather[0].icon} />
      <Button
        title="Go back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222441',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
