import { ForecastWeatherDataProps } from "../Sections/ForecastsCarousel.js";
import { APIKEY } from "../secrets.js";
import { WeatherData } from "../types/Types.js";
import { showToast } from "./showToast";

type Option = "current" | "forecast";

export type FetchCurrentWeatherDataResult = {
  weatherData?: WeatherData | null;
  error?: string;
};

export type FetchForecastDataResult = {
  forecastData?: ForecastWeatherDataProps | null;
  error?: string;
};

export const fetchWeatherData = async (
  option: Option,
  text: string
): Promise<FetchCurrentWeatherDataResult | FetchForecastDataResult> => {
  const location = text || "somalia"; // Default location
  const forecastCount = 40;
  const current_url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}&units=metric`;
  const forecast_url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${APIKEY}&units=metric&cnt=${forecastCount}`;
  const fetch_url = option === "current" ? current_url : forecast_url;

  try {
    const res = await fetch(fetch_url);
    const data = await res.json();
    if (data.cod === "404") {
      showToast({
        type: "info",
        message: ["Info", "Location not found, using Tampere as default"],
      });
      return fetchWeatherData(option, "Tampere");
    }

    if (option === "current") {
      return { weatherData: data, forecastData: null, error: undefined };
    } else {
      return { weatherData: null, forecastData: data, error: undefined };
    }
  } catch (error) {
    showToast({
      type: "info",
      message: [
        "Info",
        "There was an error fetching the weather data, using Tampere as default location",
      ],
    });
    return {
      weatherData: null,
      forecastData: null,
      error: "Error fetching weather data",
    };
  }
};
