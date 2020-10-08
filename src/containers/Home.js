import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import WeatherImage from "../components/WeatherImage";

const weatherKey = `55ae636d83716ea7b8400231885c1cb4`;

function Home() {
  // These are states, or variables referenced by the JSX
  const history = useHistory(); //This is an object that contains info about the route and url that the user took to get to this page
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Chicago");

  // This occurs when the page loads
  useEffect(() => {
    axios
      // Get request from an address
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherKey}`
      )
      .then(function (response) {
        // handle success
        const weather = response.data;
        setWeatherData(weather);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [city]); // The [city] means we will run the function every time city is called

  // Runs every time history changes
  useEffect(() => {
    const searchParams = history.location.search;
    const urlParams = new URLSearchParams(searchParams);
    const city = urlParams.get("city");
    if (city) {
      setCity(city);
    }
  }, [history]);
  // Every time weatherData updates, we will run the below
  // This is a succinct way to declare lots of variables, whose values reference values in the received object from our API
  const {
    cloudiness,
    cloudinessValue,
    currentTemp,
    currentTempValue,
    highTemp,
    humidity,
    lowTemp,
    weatherType,
    windSpeed,
  } = useMemo(() => {
    let cloudiness = "";
    let cloudinessValue = 0;
    let currentTemp = "";
    let currentTempValue = 0;
    let highTemp = "";
    let humidity = "";
    let lowTemp = "";
    let weatherType = "";
    let windSpeed = "";

    if (weatherData) {
      cloudiness = weatherData.clouds.all + "%";
      cloudinessValue = weatherData.clouds.all;
      currentTemp = Math.round(weatherData.main.temp) + "°C";
      currentTempValue = Math.round(weatherData.main.temp);
      highTemp = Math.round(weatherData.main.temp_max) + "°C";
      humidity = weatherData.main.humidity + "%";
      lowTemp = Math.round(weatherData.main.temp_min) + "°C";
      weatherType = weatherData.weather[0].description;
      windSpeed = weatherData.wind.speed + " km/h";
    }

    // returning an object of values
    return {
      cloudiness,
      cloudinessValue,
      currentTemp,
      currentTempValue,
      highTemp,
      humidity,
      lowTemp,
      weatherType,
      windSpeed,
    };
  }, [weatherData]);

  console.log("Weather Data", weatherData);
  console.log("Current Temp", currentTemp);

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
      ></link>
      <div className="HeaderWrapper">
        <Header />
      </div>

      <main className="Home">
        <h2>
          Weather in <span>{city}</span>
        </h2>
        <div
          className="WeatherInfo"
          style={{
            backgroundColor: `rgba(${currentTempValue * 10}, 0, ${
              255 - currentTempValue * 10
            }, 0.2)`,
          }}
        >
          <div
            className="WeatherInfo_Basic"
            style={{
              backgroundColor: `hsl(44, 20%, ${100 - cloudinessValue / 3}%)`,
            }}
          >
            <div className="WeatherInfo_Image">
              <WeatherImage weatherType={weatherType} />
            </div>
            <p className="WeatherInfo_Type">{weatherType}</p>
            <h3 className="Label">Current Temperature:</h3>
            <p
              className="WeatherInfo_Temperature"
              style={{
                color: `rgba(${currentTempValue * 10}, 0, ${
                  255 - currentTempValue * 10
                }, 0.5)`,
              }}
            >
              {currentTemp}
            </p>
          </div>
          <div className="WeatherInfo_Extra">
            <div className="WeatherInfo_Extra_Column">
              <h3 className="Label">High Temperature:</h3>
              <p className="WeatherInfo_Temperature_Small">{highTemp}</p>
              <h3 className="Label">Low Temperature:</h3>
              <p className="WeatherInfo_Temperature_Small">{lowTemp}</p>
            </div>
            <div className="WeatherInfo_Extra_Column">
              <h3 className="Label">Cloudiness:</h3>
              <p className="WeatherInfo_Temperature_Small">{cloudiness}</p>
              <h3 className="Label">Humidity:</h3>
              <p className="WeatherInfo_Temperature_Small">{humidity}</p>
              <h3 className="Label">Windspeed:</h3>
              <p className="WeatherInfo_Temperature_Small">{windSpeed}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
