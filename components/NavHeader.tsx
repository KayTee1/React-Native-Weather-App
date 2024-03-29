import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

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
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 60,
        padding: 13,
      }}
    >
      {showBackButton && (
        <TouchableOpacity onPress={onBackButtonPress}>
          <Icon name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      )}
      <Text style={{ fontSize: 20, color: "black" }}>{title}</Text>
      <Icon
        onPress={() => {
          navigation.navigate("Settings");
        }}
        name="setting"
        size={24}
        color="black"
      />
      <View style={{ width: 24 }}></View>
    </View>
  );
};

export default NavHeader;
