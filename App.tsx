import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  StackHeaderProps,
  createStackNavigator,
} from "@react-navigation/stack";
import "intl-pluralrules";
import { useTranslation } from "react-i18next";
import "./i18n";

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
  const { t, i18n } = useTranslation();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Weather Forecast">
        <Stack.Screen
          name="Weather Forecast"
          component={WeatherForecast}
          options={generateScreenOptions(t("weather_forecast"), false)}
        />
        <Stack.Screen
          name="Forecast"
          component={ForecastDetails}
          options={generateScreenOptions(t("forecast_details"), true)}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={generateScreenOptions(t("settings"), true)}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
