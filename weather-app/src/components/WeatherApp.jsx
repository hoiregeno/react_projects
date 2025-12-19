import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/WeatherApp.module.css";
import { SearchIcon } from "../assets/index.js";
import { getWeatherInfo, getWindDirection } from "../utils/weatherUtils";

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [cityInput, setCityInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const inputRef = useRef(null);

  // Auto-focus input field
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Fetch our weather data
  const fetchWeather = async (e) => {
    e.preventDefault();
    const cleanInput = cityInput.trim();

    if (!cleanInput) {
      setErrorMessage("Please enter a city.");
      inputRef.current.focus();
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cleanInput}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`Couldn't locate "${cleanInput}". Please try again.`);
      }

      const data = await response.json();

      setWeather(data);
      setErrorMessage("");
    } catch (err) {
      setErrorMessage(err.message);
      inputRef.current.focus();
    } finally {
      setIsLoading(false);
      setCityInput("");
    }
  };

  // Extract weather info from weatherUtils.js
  const {
    cityName,
    country,
    tempC,
    feelsLike,
    humidity,
    icon,
    description,
    windKmh,
    windDeg,
  } = getWeatherInfo(weather);

  return (
    <>
      <h1 className={styles.appTitle}>Weather App</h1>

      <form onSubmit={fetchWeather} className={styles.searchForm}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter city here"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
        <button type="submit">
          <SearchIcon width="24" height="24" fill="hsl(180, 100%, 10%)" />
        </button>
      </form>

      {isLoading && (
        <div className={styles.spinnerContainer}>
          <div className={styles.spinner} />
        </div>
      )}

      {errorMessage && !isLoading && (
        <p className={styles.error}>{errorMessage}</p>
      )}

      {weather && !isLoading && !errorMessage && (
        <div className={styles.card}>
          <h1>{`${cityName}, ${country}`}</h1>
          <h2>{`${tempC}°C`}</h2>
          <p>{description}</p>

          <div className={styles.wrapper}>
            <div className={styles.left}>
              <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={description}
              />
            </div>

            <div className={styles.right}>
              <p>{`Feels Like: ${feelsLike}°C`}</p>
              <p>{`Humidity: ${humidity}%`}</p>
              <p>{`Wind: ${windKmh} km/h (${getWindDirection(windDeg)})`}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WeatherApp;
