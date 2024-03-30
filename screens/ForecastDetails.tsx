import { Pressable, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { LinearGradient } from "react-native-linear-gradient";

import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { getFormattedTime } from "../util/getTime";
import { WeatherData } from "../types/Types";

import RenderItem from "../components/RenderItem";

type RootStackParamList = {
  data: {
    forecasts: WeatherData[];
  };
};

type navigationProp = StackNavigationProp<RootStackParamList, "data">;

export default function ForecastDetails() {
  const navigation = useNavigation<navigationProp>();
  const route = useRoute();
  const { data }: RootStackParamList = route.params as RootStackParamList;

  return (
    <LinearGradient
      colors={["rgba(0,0,0,0.8)", "transparent"]}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.text}>{data.forecasts[0].name}, </Text>
        <Text style={styles.text}>
          {getFormattedTime(data.forecasts[0].dt)}
        </Text>
      </View>

      <View style={styles.forecastsContainer}>
        <FlatList
          data={data.forecasts}
          renderItem={({ item }) => <RenderItem forecast={item} />}
          keyExtractor={(item) => item.dt.toString()}
        />
      </View>
      <Pressable style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go back</Text>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222441",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    minWidth: 300,
    minHeight: 60,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  forecastsContainer: {
    flexDirection: "column",
    height: 400,
    overflow: "scroll",
    position: "relative",
  },
  text: {
    color: "black",
    fontSize: 20,
  },
  button: {
    marginBottom: 30,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    minWidth: 300,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    color: "black",
  },
});
