import Geolocation from "react-native-geolocation-service";
import { PermissionsAndroid } from "react-native";
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
      console.log("You can use Geolocation");
      return true;
    } else {
      console.log("You cannot use Geolocation");
      return false;
    }
  } catch (err) {
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
        const city = getReverseGeocoding(latitude, longitude);
        return city;
      },
      (error) => {
        console.log("Error getting location:", error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  } else {
    console.log("Location permission not granted");
  }
  return null;
};

export const getReverseGeocoding = async (
  latitude: number,
  longitude: number
) => {
  const response = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
  );
  const data = await response.json();
  const { city } = data;
  return city;
};
