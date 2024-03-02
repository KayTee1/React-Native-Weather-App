import { APIKEY } from "../secrets.js";
import { showToast } from "./showToast";

type Option = "current" | "forecast";

export const fetchWeatherData = async (option: Option, text: string) => {
  const location = text || "Tampere"; //default location
  const forecastCount = 40;
  const current_url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}&units=metric`;
  const forecast_url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${APIKEY}&units=metric&cnt=${forecastCount}`;
  let fetch_url;
  try {
    option === "current"
      ? (fetch_url = current_url)
      : (fetch_url = forecast_url);
    const res = await fetch(fetch_url);
    if (!res.ok) {
      fetchWeatherData("current", "Tampere");
      showToast({
        type: "info",
        message: [
          "Info",
          "Location not found, using Tampere as default location",
        ],
      });
      return;
    } else {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    showToast({
      type: "info",
      message: [
        "Info",
        "There was an error fetching the weather data, using Tampere as default location",
      ],
    });
    fetchWeatherData("current", "Tampere");
  }
};
