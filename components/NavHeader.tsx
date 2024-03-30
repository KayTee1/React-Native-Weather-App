import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, useRoute } from "@react-navigation/native";

import Icon from "react-native-vector-icons/AntDesign";

type RootStackParamList = {
  Settings: undefined;
};
type navigationProp = StackNavigationProp<RootStackParamList, "Settings">;

type NavHeaderProps = {
  title: string;
  showBackButton: boolean;
  onBackButtonPress: () => void;
};

const NavHeader = ({
  title,
  showBackButton,
  onBackButtonPress,
}: NavHeaderProps) => {
  const navigation = useNavigation<navigationProp>();
  const route = useRoute();
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {showBackButton && (
          <TouchableOpacity onPress={onBackButtonPress}>
            <Icon name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        )}
        <Text style={{ fontSize: 20, color: "black", marginLeft: 10 }}>
          {title}
        </Text>
      </View>
      {route.name !== "Settings" && (
        <Icon
          onPress={() => {
            navigation.navigate("Settings");
          }}
          name="setting"
          size={24}
          color="black"
          style={{ marginRight: 10 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    padding: 13,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
});

export default NavHeader;
