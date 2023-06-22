import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&lang=fr&q=Strasbourg&days=10`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {weatherData ? (
        (console.log(weatherData.forecast.forecastday),
        weatherData.forecast.forecastday.map((weatherDay) => (
          <div className="cardMeteo">
            <h2>{weatherDay.date}</h2>
            <p>{weatherDay.day.condition.text}</p>
            <p>Temperature: {weatherDay.day.avgtemp_c}°C</p>
            <img
              src={weatherDay.current.condition.icon}
              alt="Weather Icon"
            />{" "}
          </div>
        )))
      ) : (
        <p>Loading...</p>
      )}
      <div className="cardMeteo">
        {weatherData ? (
          (console.log(weatherData),
          (
            <div>
              <h2>{weatherData.location.name}</h2>
              <p>{weatherData.current.condition.text}</p>
              <p>Temperature: {weatherData.current.temp_c}°C</p>
              <img
                src={weatherData.current.condition.icon}
                alt="Weather Icon"
              />
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div>{/* {JSON.stringify(weatherData)} */}</div>
    </div>
  );
};

export default Weather;
