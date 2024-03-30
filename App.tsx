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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Weather Forecast">
        <Stack.Screen
          name="Weather Forecast"
          component={WeatherForecast}
          options={({ navigation }) => ({
            header: (props: StackHeaderProps) => (
              <NavHeader
                title="Weather Forecast"
                showBackButton={false}
                onBackButtonPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Forecast"
          component={ForecastDetails}
          options={({ navigation }) => ({
            header: (props: StackHeaderProps) => (
              <NavHeader
                title="Forecast Details"
                showBackButton={true}
                onBackButtonPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
