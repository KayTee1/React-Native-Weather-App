import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder="Enter location"
              onSubmitEditing={() => handleSearch("normal")}
            />
            <Pressable onPress={() => handleSearch("normal")}>
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
  gps_button: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    border: "1px solid lightblue",
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
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
