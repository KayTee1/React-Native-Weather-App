import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import getTime from '../util/getTime';

type HeaderProps = {
  iconCode: string;
};

export default function Header({ iconCode }: HeaderProps) {
  const formattedDate = getTime();
  const uri = `http://openweathermap.org/img/wn/${iconCode}.png`;
  return (
    <View style={styles.header}>
      <Image
        style={styles.icon}
        source={{
          uri: uri,
        }}
      />
      <View>
        <Text style={styles.text}>Today</Text>
        <Text style={styles.time}>{formattedDate}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  text: {
    fontSize: 34,
    color: '#fff',
  },
  time: {
    fontSize: 15,
    color: '#fff',
  },
});
