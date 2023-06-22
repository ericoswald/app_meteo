import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&lang=fr&q=Strasbourg&days=7`
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
      <h1 style={{
        textAlign: "center",
        textTransform : "capitalize",
      
      }}>Météo</h1>
      <div style={{

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

      }} className="cardMeteo"  >
        {weatherData ? (
          
          
            <div style={{      
            display: "flex",
            flexDirection: "column",
            }}>
              <h2>{weatherData.location.name}</h2>
              <p>{weatherData.current.condition.text}</p>
              <p>Temperature: {weatherData.current.temp_c}°C</p>
              <img
                src={weatherData.current.condition.icon}
                alt="Weather Icon"
              />
            </div>
          
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {weatherData ? (
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",

        }}>
       { weatherData.forecast.forecastday.map((weatherDay) => (

          <div style={{
            width : "15%",
            minWidth : "200px",
            height : "250px",
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            margin: "10px",
          }}  className="cardMeteo">
            {console.log("tututu", weatherDay)}
            <h2 style={{
              textAlign: "center",
              textTransform : "capitalize",
            }}>{new Date(weatherDay.date).toLocaleDateString("fr-FR", { weekday: 'long', day:"numeric" })}</h2>
           
            <p>{weatherDay.day.condition.text}</p>
        <div>Temperature Min : {weatherDay.day.mintemp_c}°C</div>
            <div>Temperature Max: {weatherDay.day.maxtemp_c}°C</div>
            <img
              src={weatherDay.day.condition.icon}
              alt="Weather Icon"
            />{" "}
          </div>
        ))}
        </div>
        
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Weather;
