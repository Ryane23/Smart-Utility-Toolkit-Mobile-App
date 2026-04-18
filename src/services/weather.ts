export type WeatherData = {
  temp: number;
  condition: string;
  cityName: string;
};

// Use a placeholder key or allow the user to input their OpenWeatherMap API key (using a public one for testing ease).
export const fetchWeather = async (city: string): Promise<WeatherData> => {
  const apiKey = '8d2de98e089f1c28e1a22fc19a24fb00'; // Replace with a solid OpenWeatherMap API key
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`);
  
  if (!res.ok) {
    throw new Error('City not found or API error');
  }

  const data = await res.json();
  return {
    temp: data.main.temp,
    condition: data.weather[0].main,
    cityName: data.name,
  };
};
