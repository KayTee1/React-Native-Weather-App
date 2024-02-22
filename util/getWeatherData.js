import { APIKEY } from '../secrets.js';
export default function GetWeatherData() {
  const fetchWeatherData = async () => {
    const location = 'tampere';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}&units=metric`;
    try {
      const res = await fetch(url);
      const data = await res.json();

      return data;
    } catch (error) {
      return error;
    }
  };

  return fetchWeatherData();
}
