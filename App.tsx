import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WeatherForecast from './screens/WeatherForecast';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Weather Forecast"
          component={WeatherForecast}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
