import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WeatherPage.css";

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = '717b0497b867cd7ff8a8eec4a609c6f9';
  const cityId = '703448'; 

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${API_KEY}`);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Помилка запиту до API погоди, спробуйте ще раз:', error);
      }
    };
    fetchWeather();
  }, []);

  return (
    <div className="weather-page">
      <h2>Погода у Києві</h2>
      {weatherData ? (
        <div>
          <p>Місто: {weatherData.name}</p>
          <p>Температура: {Math.round(weatherData.main.temp - 273.15)} °C</p>
          <p>Опис: {weatherData.weather[0].description}</p>
        </div>
      ) : (
        <p>Завантаження...</p>
      )}
    </div>
  );
};

export default WeatherPage;