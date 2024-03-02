import { ForecastWeatherDataProps } from "../Sections/ForecastsCarousel.js";
import { APIKEY } from "../secrets.js";
import { ErrorData, WeatherData } from "../types/Types.js";
import { showToast } from "./showToast";

const MAX_RETRIES = 3;

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
  text: string,
  retries = 0
): Promise<FetchCurrentWeatherDataResult | FetchForecastDataResult> => {
  const location = text || "Tampere"; // Default location
  const forecastCount = 40;
  const current_url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}&units=metric`;
  const forecast_url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${APIKEY}&units=metric&cnt=${forecastCount}`;
  const fetch_url = option === "current" ? current_url : forecast_url;

  try {
    const res = await fetch(fetch_url);
    if (!res.ok) {
      if (retries < MAX_RETRIES) {
        // Retry with default location
        return fetchWeatherData(option, "Tampere", retries + 1);
      } else {
        throw new Error("Maximum retries exceeded");
      }
    }
    const data = await res.json();
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
