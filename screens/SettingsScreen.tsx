import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Dropdown } from 'react-native-element-dropdown';

export default function SettingsScreen() {
  const [defaultLocation, setDefaultLocation] = useState<string>("");
  const [language, setLanguage] = useState<string>("");

  const handleSaveSettings = () => {
    console.log("Default Location:", defaultLocation);
    console.log("Language:", language);
    
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
          <TextInput
            style={styles.input}
            value={language}
            onChangeText={(text) => setLanguage(text)}
            placeholder="Enter language"
          />
        </View>
        <Pressable style={styles.button} onPress={handleSaveSettings}>
          <Text style={{ color: "black" }}>Save Settings</Text>
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
  },
  footer: {
    position: "absolute",
    bottom: 10,
    color: "white",
  },
});
