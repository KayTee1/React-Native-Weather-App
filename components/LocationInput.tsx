import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Animated,
  Pressable,
  Modal,
  Text,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import LocationInputModal from './LocationInputModal';

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
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = (option: string) => {
    setModalVisible(!modalVisible);
    fetchData();
  };
  return (
    <View style={styles.container}>
      <LocationInputModal
        handleSearch={handleSearch}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        text={text}
        onChangeText={onChangeText}
      />
      <Pressable
        style={{
          backgroundColor: 'black',
          height: 40,
          width: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        }}
        onPress={() => setModalVisible(true)}>
        <Icon
          name="location"
          size={24}
          color="white"
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
});
