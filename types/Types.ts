// types for main weather data
export type WeatherData = {
  main: WeatherDataMainProps;
  weather: DescriptionProps[];
  wind: { speed: number };
  dt: number;
  dt_txt: string;
  name: string;
  sys: { country: string };
  snow?: { '3h': number };
  rain?: { '3h': number };
  clouds: { all: number };
};

// types for weather[0]
export type DescriptionProps = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

// types for main data (temp, feels_like, pressure, etc)
export type WeatherDataMainProps = {
  temp: number;
  feels_like: number;
};
