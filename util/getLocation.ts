import { PermissionsAndroid } from "react-native";
import Geolocation from "react-native-geolocation-service";

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
export const getCurrentLocation = async () => {
  // Check if location permission is granted
  const isPermissionGranted = await requestLocationPermission();
  if (isPermissionGranted) {
    // Get the current position
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Get the city name from the latitude and longitude
        const city = getReverseGeocoding(latitude, longitude);
        return city;
      },
      (error) => {
        console.log("Error getting location:", error);
        showToast({
          type: "error",
          message: ["Error", "There was an error getting your location"],
        });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  } else {
    showToast({
      type: "info",
      message: ["Info", "Location permission not granted"],
    });
  }
  return null;
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
    console.log("Error getting city name:", error);
    showToast({
      type: "error",
      message: ["Error", "There was an error getting the city name"],
    });
  }
};
