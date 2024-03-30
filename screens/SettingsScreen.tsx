import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { storeData } from "../util/storage";
import LanguageDropdown from "../components/LanguageDropdown";

type Languages = "En" | "Fi" | "Vn";

export default function SettingsScreen() {
  const [defaultLocation, setDefaultLocation] = useState<string>("");
  const [language, setLanguage] = useState<Languages>("En");

  const navigation = useNavigation();

  const handleSaveSettings = () => {
    console.log("Default Location:", defaultLocation);
    console.log("Language:", language);

    if (defaultLocation !== "") {
      try {
        storeData("defaultLocation", defaultLocation);
        storeData("language", language);
      } catch (e) {
        console.log(e);
      }
    }
    navigation.goBack();
  };
  return (
    <LinearGradient
      colors={["rgba(0,0,0,0.8)", "transparent"]}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Default Location:</Text>
          <TextInput
            style={styles.input}
            value={defaultLocation}
            onChangeText={(text) => setDefaultLocation(text)}
            placeholder="Enter default location"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Language:</Text>
          <LanguageDropdown language={language} setLanguage={setLanguage} />
        </View>
        <Pressable style={styles.button} onPress={handleSaveSettings}>
          <Text style={styles.buttonText}>Save Settings</Text>
        </Pressable>
      </View>
      <Text style={styles.footer}>Made with ❤️ by KayTee1</Text>
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
