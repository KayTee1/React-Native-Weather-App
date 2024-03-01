import React, { useState, useRef } from 'react';
import { View, StyleSheet, TextInput, Animated, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

type LocationInputProps = {
  text: string;
  onChangeText: (text: string) => void;
  fetchData: () => void;
};

export default function LocationInput({
  text,
  onChangeText,
  fetchData,
}: LocationInputProps) {
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const inputWidth = useRef(new Animated.Value(0)).current;

  const toggleInput = () => {
    setInputVisible(!inputVisible);
    Animated.timing(inputWidth, {
      toValue: inputVisible ? 0 : 250,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleInput}>
        <Icon
          name="location"
          size={24}
          color="black"
        />
      </Pressable>
      <Animated.View style={{ width: inputWidth }}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Enter location"
        />
      </Animated.View>
      <Pressable onPress={fetchData}>
        <Icon
          name="check"
          size={24}
          color="black"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 5,
    height: 40,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
