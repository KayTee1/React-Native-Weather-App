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
      <Stack.Navigator
        initialRouteName="Weather Forecast"
        screenOptions={({ navigation, route }) => ({
          header: (props: StackHeaderProps) => {
            const { scene, previous } = props;
            console.log(props)
            const title = scene
              ? scene.descriptor.options.title ?? route.name
              : route.name;

            return (
              <NavHeader
                title={title}
                showBackButton={previous != null}
                onBackButtonPress={navigation.goBack}
              />
            );
          },
        })}
      >
        <Stack.Screen name="Weather Forecast" component={WeatherForecast} />
        <Stack.Screen name="Forecast" component={ForecastDetails} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
