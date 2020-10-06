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
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}`
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
    currentTemp,
    highTemp,
    humidity,
    lowTemp,
    weatherType,
    windSpeed,
  } = useMemo(() => {
    let cloudiness = "";
    let currentTemp = "";
    let highTemp = "";
    let humidity = "";
    let lowTemp = "";
    let weatherType = "";
    let windSpeed = "";

    if (weatherData) {
      cloudiness = weatherData.clouds.all + "%";
      currentTemp = weatherData.main.temp;
      highTemp = weatherData.main.temp_max;
      humidity = weatherData.main.humidity + "%";
      lowTemp = weatherData.main.temp_min;
      weatherType = weatherData.weather[0].description;
      windSpeed = weatherData.wind.speed + " km/h";
    }

    // returning an object of values
    return {
      cloudiness,
      currentTemp,
      highTemp,
      humidity,
      lowTemp,
      weatherType,
      windSpeed,
    };
  }, [weatherData]);

  /* Display:
        Weather Type
        Current Temp
        High Temp
        Low Temp
        Cloudiness
        Humidity
        Wind Speed
    */

  console.log("Weather Data", weatherData);

  return (
    <div>
      <Header />
      <main className="Home">
        <h2>
          Weather in <span>{city}</span>
        </h2>
        <div className="WeatherInfo">
          <div className="WeatherInfo_Basic">
            <div className="WeatherInfo_Image">
              <WeatherImage weatherType={weatherType} />
            </div>
            <p className="WeatherInfo_Type">{weatherType}</p>
            <h3 className="Label">Current Temperature:</h3>
            <p className="WeatherInfo_Temperature">{currentTemp}</p>
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
