"use client";

import { SyntheticEvent, useState } from "react";
import axios from "axios";
import Weather from "../components/Weather";

interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: [
    {
      icon: string;
      main: string;
      description: string;
    }
  ];
  wind: {
    speed: number;
  };
  city: string;
}

export default function Home() {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const apiKey = process.env.NEXT_PUBLIC_WEATHER_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const fetchWeather = (event: SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setWeather(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      });
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

          {weather ? <Weather data={{ ...weather, city }} /> : null}
        </div>
      </div>
    </div>
  );
}
