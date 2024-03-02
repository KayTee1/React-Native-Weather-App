import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

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
      <Pressable
        style={styles.centeredView}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder="Enter location"
              onSubmitEditing={() => handleSearch("normal")}
            />
            <Pressable onPress={() => handleSearch("normal")}>
              <Icon
                style={{ height: 50 }}
                name="location-arrow"
                size={48}
                color="black"
              />
            </Pressable>
          </View>
          <Pressable
            style={styles.gps_button}
            onPress={() => {
              handleSearch("gps");
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={{ color: "black" }}>Use current location</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    color: "black",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
  },
});
