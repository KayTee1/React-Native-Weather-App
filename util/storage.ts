import AsyncStorage from '@react-native-async-storage/async-storage';

//storing default location name
export const storeData = async (name: string, value: string) => {
    try {
        await AsyncStorage.setItem(name, value);
    } catch (e) {
        // saving error
    }
};

type Languages = "en" | "fi" | "vn";

// getting default location name
export const getData = async (name: string): Promise<string | Languages | null> => {
    const defaultLocation = "tampere";
    const defaultLanguage = "en";
    let defaultValue = name === "defaultLocation" ? defaultLocation : defaultLanguage;
    try {
        let value = await AsyncStorage.getItem(name);
        // if value is null, set the default value
        if (value === null) {
            await storeData(name, defaultValue);
            value = defaultValue;
        }
        if (name === "language") {
            return value as Languages;
        } else {
            return value;
        }
    } catch (e) {
        console.error("Error reading value:", e);
        return null;
    }
};
