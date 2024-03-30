import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  StackHeaderProps,
  createStackNavigator,
} from "@react-navigation/stack";

import WeatherForecast from "./screens/WeatherForecast";
import ForecastDetails from "./screens/ForecastDetails";
import SettingsScreen from "./screens/SettingsScreen";
import NavHeader from "./components/NavHeader";

const Stack = createStackNavigator();

const generateScreenOptions =
  (title: string, showBackButton: boolean) =>
  ({ navigation }: { navigation: any }) => ({
    header: (props: StackHeaderProps) => (
      <NavHeader
        title={title}
        showBackButton={showBackButton}
        onBackButtonPress={() => navigation.goBack()}
      />
    ),
  });

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Settings">
        <Stack.Screen
          name="Weather Forecast"
          component={WeatherForecast}
          options={generateScreenOptions("Weather Forecast", false)}
        />
        <Stack.Screen
          name="Forecast"
          component={ForecastDetails}
          options={generateScreenOptions("Forecast Details", true)}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={generateScreenOptions("Settings", true)}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
