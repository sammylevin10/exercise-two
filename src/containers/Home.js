import React from 'react';

import Header from "../components/Header"

const weatherKey = `55ae636d83716ea7b8400231885c1cb4`;

function Home() {
    /* Display:
        Weather Type
        Current Temp
    */
    return (
        <div>
        <Header />
        <main className = "Home">
             <h2>Weather in Seoul</h2>
             <div className = "WeatherInfo">
                 <p>Weather Type: Cloudy</p>
                 <p>Current Temperature: 100 degrees</p>
                 <p>High Temperature: 100 degrees</p>
                 <p>Low Temperature: 80 degrees</p>
                 <p>Cloudiness: 100%</p>
                 <p>Humidity: 35%</p>
                 <p>Windspeed: 3km/h</p>
             </div>
             <p>Weather data displayed here</p>
        </main>
        </div>
    )
}

export default Home;