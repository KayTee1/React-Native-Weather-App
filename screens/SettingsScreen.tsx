import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { getData, storeData } from "../util/storage";
import LanguageDropdown from "../components/LanguageDropdown";
import { t } from "i18next";
import i18n from "../i18n";

type Languages = "en" | "fi" | "vn";

export default function SettingsScreen() {
  const navigation = useNavigation();

  const [defaultLocation, setDefaultLocation] = useState<string>("");
  const [language, setLanguage] = useState<Languages>("en");

  useEffect(() => {
    getData("language").then((lang: string | null) => {
      if (lang !== null && ["en", "fi", "vn"].includes(lang)) {
        setLanguage(lang as Languages);
      } else {
        console.warn(`Unsupported language: ${lang}`);
      }
    });
  }, []);

  const handleSaveSettings = () => {
    storeData("defaultLocation", defaultLocation);
    storeData("language", language);
    i18n.changeLanguage(language);
    navigation.goBack();
  };
  return (
    <LinearGradient
      colors={["rgba(0,0,0,0.8)", "transparent"]}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t("default_location")}:</Text>
          <TextInput
            style={styles.input}
            value={defaultLocation}
            onChangeText={(text) => setDefaultLocation(text)}
            placeholder="Enter default location"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t("language")}:</Text>
          <LanguageDropdown language={language} setLanguage={setLanguage} />
        </View>
        <Pressable style={styles.button} onPress={handleSaveSettings}>
          <Text style={styles.buttonText}>{t("save_settings")}</Text>
        </Pressable>
      </View>
      <Text style={styles.footer}>{t("footer")}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222441",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  content: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 18,
  },
  inputContainer: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    color: "white",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    color: "black",
  },
  footer: {
    position: "absolute",
    bottom: 10,
    color: "white",
  },
});
