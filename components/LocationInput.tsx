import { Pressable, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

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
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <Icon.Button
        name="search1"
        backgroundColor=""
        onPress={fetchData}
        color="black"></Icon.Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btn_text: {
    fontSize: 20,
    textAlign: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 5,
  },
  input: {
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
