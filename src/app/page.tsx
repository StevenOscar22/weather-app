"use client";

import { useState } from "react";
import axios from "axios";
import Weather from "../components/Weather";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, isLoading] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric`;

  const fetchWeather = (event:any) => {
    event.preventDefault();
    isLoading(true);
    axios.get(url).then((response) => {
      setWeather(response.data);
      console.log(response.data);
    });
    isLoading(false);
  };

  return (
    <div>
      <div className="app">
        <div className="container">
          <form onSubmit={fetchWeather}>
            <input
              type="search"
              placeholder="Search City"
              value={city}
              className="text-slate-600 p-2 rounded-md shadow-lg w-10/12"
              onChange={(event) => setCity(event.target.value)}
            ></input>
            <button onClick={fetchWeather} className="p-2 rounded-md ml-1">
              Search
            </button>
          </form>

          {weather.main && <Weather data={(city, weather)} />}
        </div>
      </div>
    </div>
  );
}
