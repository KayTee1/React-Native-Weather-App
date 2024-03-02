import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import WeatherForecast from "./screens/WeatherForecast";
import ForecastDetails from "./screens/ForecastDetails";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Weather Forecast">
        <Stack.Screen name="Weather Forecast" component={WeatherForecast} />
        <Stack.Screen name="Forecast" component={ForecastDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
