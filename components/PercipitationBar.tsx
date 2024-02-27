import { StyleSheet, Text, View } from 'react-native';

export default function PrecipitationBar({
  precipitationData,
}: {
  precipitationData: number[];
}) {
  return (
    <View style={styles.container}>
      {precipitationData.map((precipitation, index) => (
        <View
          key={index}
          style={styles.bar}>
          <Text style={styles.text}>{precipitation}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222441',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: {
    backgroundColor: 'white',
    width: 30,
    height: 100,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});
