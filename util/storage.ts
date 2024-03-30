import AsyncStorage from '@react-native-async-storage/async-storage';

//storing default location name
export const storeData = async (name: string, value: string) => {
    try {
        await AsyncStorage.setItem(name, value);
    } catch (e) {
        // saving error
    }
};

//getting default location name
export const getData = async (name: string) => {
    const defaultValue = "tampere";
    try {
        let value = await AsyncStorage.getItem(name);
        //if value is null, set the default value
        if (value === null) {
            await storeData(name, defaultValue);
            value = defaultValue;
        }
        return value
    } catch (e) {
        // error reading value
    }
};