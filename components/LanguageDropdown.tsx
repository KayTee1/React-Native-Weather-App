import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/FontAwesome";

type Languages = "En" | "Fi" | "Vn";
type LanguageDropdownProps = {
  language: Languages;
  setLanguage: (language: Languages) => void;
};
type Data = {
  label: string;
  language: Languages;
};

const data: Data[] = [
  { label: "English", language: "En" },
  { label: "Suomi", language: "Fi" },
  { label: "Tiếng Việt", language: "Vn" },
];

const LanguageDropdown = ({ language, setLanguage }: LanguageDropdownProps) => {
  const renderItem = (item: Data) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.language === language && (
          <Icon style={styles.icon} color="#007bff" name="check" size={16} />
        )}
      </View>
    );
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="language"
      placeholder="Select item"
      searchPlaceholder="Search..."
      value={language}
      onChange={(item) => {
        setLanguage(item.language);
      }}
      renderLeftIcon={() => (
        <Icon style={styles.icon} color="#6c757d" name="language" size={20} />
      )}
      renderItem={renderItem}
    />
  );
};

export default LanguageDropdown;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    zIndex: 1,
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
  },
  textItem: {
    fontSize: 16,
    color: "#495057",
  },
  icon: {
    marginRight: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#6c757d",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#007bff",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: "#495057",
  },
});
