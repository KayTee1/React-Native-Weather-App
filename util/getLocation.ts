import Geolocation from "react-native-geolocation-service";
import { PermissionsAndroid } from "react-native";
import { showToast } from "./showToast";

// Function to get permission for location
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Geolocation Permission",
        message: "Can we access your location?",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    console.log("granted", granted);
    if (granted === "granted") {
      showToast({
        type: "success",
        message: ["Success", "Location permission granted"],
      });
      return true;
    } else {
      showToast({
        type: "info",
        message: ["Info", "Location permission not granted"],
      });
      return false;
    }
  } catch (err) {
    showToast({
      type: "error",
      message: ["Error", "There was an error getting location permission"],
    });
    return false;
  }
};

// Function to get the current location
export const getCurrentLocation = async (): Promise<string | null> => {
  try {
    const isPermissionGranted = await requestLocationPermission();
    if (!isPermissionGranted) {
      showToast({
        type: "info",
        message: ["Info", "Location permission not granted"],
      });
      return null;
    }

    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const city = getReverseGeocoding(latitude, longitude);
          resolve(city);
        },
        (error) => {
          console.log("Error getting location:", error);
          showToast({
            type: "error",
            message: ["Error", "There was an error getting your location"],
          });
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });
  } catch (error) {
    console.error("Error requesting location permission:", error);
    showToast({
      type: "error",
      message: ["Error", "There was an error requesting location permission"],
    });
    return null;
  }
};

// Function to get the city name from the latitude and longitude
export const getReverseGeocoding = async (
  latitude: number,
  longitude: number
) => {
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
    const data = await response.json();
    const { city } = data;

    return city;
  } catch (error) {
    showToast({
      type: "error",
      message: ["Error", "There was an error getting the city name"],
    });
  }
};
