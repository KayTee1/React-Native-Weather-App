import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { getFormattedTime } from "../util/getTime";
import { DescriptionProps } from "../types/Types";

import WeatherIcon from "./WeatherIcon";
import { useTranslation } from "react-i18next";

type HeaderProps = {
  weather: DescriptionProps[];
  dt: number;
};

export default function Header({ weather, dt }: HeaderProps) {
  const { t } = useTranslation();

  const formattedDate = getFormattedTime(dt);
  if (!weather)
    return (
      <View>
        <Text>{t("loading")}</Text>
      </View>
    );
  const { icon } = weather[0];
  return (
    <View style={styles.header}>
      <WeatherIcon iconCode={icon} size="lg" />
      <View>
        <Text style={styles.text}>{t("today")}</Text>
        <Text style={styles.time}>{formattedDate}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 34,
    color: "#fff",
  },
  time: {
    fontSize: 15,
    color: "#fff",
  },
});
