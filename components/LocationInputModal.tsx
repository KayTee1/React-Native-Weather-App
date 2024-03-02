import React from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";

type LocationInputModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  text: string;
  onChangeText: (text: string) => void;
  handleSearch: (option: string) => void;
};

export default function LocationInputModal({
  handleSearch,
  modalVisible,
  setModalVisible,
  text,
  onChangeText,
}: LocationInputModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder="Enter location"
              onSubmitEditing={() => handleSearch("normal")}
            />
            <Pressable style={styles.checkButton} onPress={() => handleSearch("normal")}>
              <Icon name="check" size={48} color="black" />
            </Pressable>
          </View>
          <Pressable
            style={styles.gps_button}
            onPress={() => {
              handleSearch("gps");
              setModalVisible(!modalVisible);
            }}
          >
            <Text>Use current location</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  checkButton: {
    marginLeft: 10,
  },
  gps_button: {
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "lightgrey",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
  },
});
