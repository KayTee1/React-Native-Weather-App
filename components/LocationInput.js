import React, { useState } from "react";
import { StyleSheet, View, Button, TextInput } from "react-native";
export default function LocationInput({ onChangeLocation }) {
  const [inputText, onChangeText] = useState("");
  const handleUpdate = () => {
    onChangeLocation(inputText=== "" ? "Tampere" : inputText);
    onChangeText("");
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(inputText) => onChangeText(inputText)}
        placeholder="Enter Location"
      />

      <Button title={"Update"} onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
